<template>
    <div class="date_select">
        <div class="c_month">
            {{currentMonth}}月
        </div>
        <div class="date_l">
            <div @click="selectDate(index)" class="date_i" :class="{selected:currentDateIndex===index}"
                v-for="(item,index) in weekStr" :key="index">
                <div class="week">{{item.s}}</div>
                <div class="date">{{item.d}}</div>
            </div>
        </div>
    </div>
    <div class="time_room">
        <scroll-view class="scroll-y" :scroll-y="true" @scroll="onTimeScroll">
            <div class="time_block" v-for="(item,index) in timeList" :key="index">
                <view class="time" @click="onClickTime(index)">
                    {{item}}
                </view>
            </div>
        </scroll-view>

        <scroll-view class="scroll-x" :scroll-x="true">
            <div class="room" v-for="(item,room_index) in roomList" :key="room_index">
                <div class="room_name">{{item.roomName}}</div>
                <div class="cells" :style="{transform:`translateY(${scrollTop}px)`}">
                    <div :class="{selected:i.selected, defaultSelected:i.defaultSelected,selectedByTapTime:i.selectedByTapTime}"
                        @longtap="goToDetail(i)" @click="onClickCell(i,cell_index)" class="cell"
                        v-for="(i,cell_index) in item.cell" :key="room_index+'_'+cell_index">
                        <div class="inner_cell" v-if="i.label">
                            {{i.label}}
                        </div>
                    </div>

                </div>
            </div>
        </scroll-view>

        <van-dialog id="van-dialog" />
    </div>
    <add-btn v-if="showSubmitBtn" @on-click="submit">确定</add-btn>


</template>
<script setup>
    import {
        ref,
        computed,
        onMounted,
        nextTick
    } from "vue"
    import {
        getWeekStr,
        getWeeks,
        getTimeList
    } from '../../utils/date'
    import {
        getUserInfo
    } from '@/utils/user'
    import {
        onShow,
    } from "@dcloudio/uni-app";
    import dropright from 'lodash.dropright'
    import drop from 'lodash.drop'
    import Dialog from "@/wxcomponents/vant/dialog/dialog";
    import AddBtn from '@/components/AddBtn.vue'
    const weekStr = getWeekStr()
    const currentDateIndex = ref(0)
    const scrollTop = ref(0)
    const roomDomLength = ref('200rpx')
    const showSubmitBtn = ref(false)
    const timeList = getTimeList()
    let lastIndexSelectedByTapTime = null
    let lastCellSelectedByTapCell = {}
    let currentRowCells = []
    let completeCellSelected = false
    let completeTimeSelected = false

    const roomList = ref([])
    const currentMonth = computed(() => {
        const m = getWeeks()[currentDateIndex.value].getMonth() + 1
        return String(m).padStart(2, '0')
    })
    const roomDomTotalLength = computed(() => {
        return roomList.value.length * parseInt(roomDomLength.value) + 'rpx'
    })
    const date = computed(() => {
        return new Date().getFullYear() + '-' + currentMonth.value + '-' + weekStr[currentDateIndex.value].d
    })
    const selectDate = (index) => {
        currentDateIndex.value = index
    }
    const onTimeScroll = (event) => {
        scrollTop.value = -(event.detail.scrollTop)
    }
    const submit = () => {
        const cells = currentRowCells.filter(i => i.selected)
        const startTime = cells[0].time
        let endTime = cells[cells.length - 1].time
        const [e, e_h] = endTime.split(":")
        if (e_h === '00') endTime = e + ':30'
        if (e_h === '30') endTime = Number(e) + 1 + ':00'
        const userinfo = uni.getStorageSync('userinfo')
        const result = {
            room_id: cells[0].roomId,
            audit: cells[0].roomAudit,
            start_time: startTime,
            end_time: endTime,
            date: date.value,
            room_name: cells[0].roomName,
            branch_name: userinfo.branchName,
            branch_id: userinfo.branchId,
            user_id: userinfo._id,
            user_name: userinfo.username,
        }
        uni.navigateTo({
            url: `/pages/meeting-record/detail?form=${encodeURIComponent(JSON.stringify(result))}`
        })
    }
    const goToDetail = (cell) => {
        const currentBranchId = getUserInfo().branchId
        if (cell.defaultSelected) {
            const type = currentBranchId === cell.branch_id ? 'edit' : 'detail'
            uni.navigateTo({
                url: `/pages/meeting-record/detail?id=${cell.id}&type=${type}`
            })
        }
    }
    const onClickCell = (cell, cell_index) => {
        const currentBranchId = getUserInfo().branchId
        cell.selected = !cell.selected
        currentRowCells = getCellsByRoomId(cell.roomId)
        if (lastCellSelectedByTapCell.roomId !== cell.roomId) {
            //点击其他会议室，则清空原先的会议室选择
            const lastCells = getCellsByRoomId(lastCellSelectedByTapCell.roomId)
            lastCells.forEach(i => i.selected = false)
            completeCellSelected = false
        } else {
            const index = timeList.findIndex(i => i === cell.time)
            if (completeCellSelected) {
                currentRowCells.forEach((_, i) => currentRowCells[i].selected = i === index)
                completeCellSelected = false
                lastCellSelectedByTapCell = cell
                return
            }
            const lastIndex = timeList.findIndex(i => i === lastCellSelectedByTapCell.time)
            const minIndex = Math.min(lastIndex, index)
            const maxIndex = Math.max(lastIndex, index)
            let i = minIndex
            while (maxIndex - i > 0) {
                if (currentRowCells[i].defaultSelected &&
                    currentRowCells[i].branch_id &&
                    currentBranchId !==
                    currentRowCells[i].branch_id) {
                    Dialog.confirm({
                        showCancelButton: false,
                        message: `会议室已被其他部门占用，请重新选择`,
                    }).then(() => {
                        currentRowCells.forEach((_, i) => currentRowCells[i].selected = false)
                        showSubmitBtn.value = false
                    })
                    break
                }
                i++
                console.log(i)
                currentRowCells[i].selected = true
            }
            console.log(currentRowCells)
            completeCellSelected = true
        }
        lastCellSelectedByTapCell = cell

        showSubmitBtn.value = true
    }

    const getIndexByTime = (time) => {
        return timeList.findIndex(time)
    }
    const getCellsByRoomId = (roomId) => {
        const target = roomList.value.find(i => i.roomId === roomId) || {}
        return target.cell || []
    }

    const onClickTime = (index) => {
        for (let i of roomList.value) {
            i.cell[index].selectedByTapTime = !i.cell[index].selectedByTapTime
        }

        if (lastIndexSelectedByTapTime !== null) {
            if (completeTimeSelected) {
                for (let k of roomList.value) {
                    k.cell.forEach((_, i) => _.selectedByTapTime = i === index)
                }
                lastIndexSelectedByTapTime = index
                completeTimeSelected = false
                return
            }
            const minIndex = Math.min(lastIndexSelectedByTapTime, index)
            const maxIndex = Math.max(lastIndexSelectedByTapTime, index)

            let i = minIndex
            while (maxIndex - i > 0) {

                for (let k of roomList.value) {
                    k.cell[i].selectedByTapTime = true
                }
                i++

            }
            completeTimeSelected = true
        }
        lastIndexSelectedByTapTime = index
    }
    const getCellOfMeeting = (meeting) => {
        let arr = []
        meeting.forEach(i => {
            if (i.start_time && i.end_time) {
                const [s, s_h] = i.start_time.split(':')
                const [e, e_h] = i.end_time.split(':')
                let l = getTimeList(s, e)
                if (s_h === '30') l = drop(l, 1)
                if (e_h === '30') l = dropright(l, 1)
                if (e_h === '00') l = dropright(l, 2)
                const item = l.map(t => ({
                    id: i._id,
                    branch_name: i.branch_name,
                    branch_id: i.branch_id,
                    remark: i.remark,
                    time: t
                }))
                arr.push(...item)
            }
        })
        return arr
    }

    const getList = async () => {
        const {
            data
        } = await uniCloud.importObject('room').getRoomListWithBooking(date.value)
        roomList.value = data.map(i => {
            i.cell = []
            const t = getCellOfMeeting(i.meeting)
            let count = 0
            for (let k of timeList) {
                const targetIndex = t.findIndex(i => i.time === k)

                if (targetIndex !== -1) {
                    count++
                    i.cell.push({
                        ...count == 1 && {
                            label: t[targetIndex].branch_name,
                        },
                        roomId: i.roomId,
                        roomName: i.roomName,
                        roomAudit: i.roomAudit,
                        defaultSelected: true,
                        selected: false,
                        time: k,
                        id: t[targetIndex].id,
                        branch_name: t[targetIndex].branch_name,
                        branch_id: t[targetIndex].branch_id,
                        remark: t[targetIndex].remark,
                        selectedByTapTime: false
                    })
                } else {
                    count = 0
                    i.cell.push({
                        roomAudit: i.roomAudit,
                        roomName: i.roomName,
                        roomId: i.roomId,
                        defaultSelected: false,
                        selected: false,
                        time: k,
                        selectedByTapTime: false
                    })
                }
            }
            return i
        })
    }

    onShow(() => {
        getList()

    })
</script>

<style scoped lang="scss">
    .date_select {
        display: flex;
        border-bottom: 1px solid #ebedf0;
    }

    .c_month {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100rpx;
        height: 100rpx;
        background: #ebedf0;
    }

    .date_l {
        width: calc(100% - 100rpx);
        display: flex;
        font-size: 12px;

        .date_i {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex-basis: 14.29%;

            .date {
                padding: 2px
            }

            &.selected {
                color: #ffffff;
                background: $uni-color-primary;
            }
        }


    }

    .time_room {
        display: flex;

        .scroll-x {
            width: calc(100vw - 100rpx);
            white-space: nowrap;
            height: calc(100vh - 100rpx);
        }

        .scroll-y {


            padding-top: 80rpx;
            text-align: center;
            width: 100rpx;
            box-sizing: border-box;
            background: #ebedf0;
            height: calc(100vh - 100rpx);
        }

        .time_block {
            display: flex;
            font-size: 12px;

            .time {
                width: 100rpx;
                z-index: 100;
                height: 60rpx;
            }

            .block {
                display: flex;
                width: v-bind(roomDomTotalLength);
                white-space: nowrap;

                .block_item {
                    display: inline-block;
                    text-align: center;
                    width: v-bind(roomDomLength);
                }
            }

        }

        .room {
            display: inline-block;
            width: v-bind(roomDomLength);
            font-size: 12px;
            justify-content: center;

            .room_name {
                background: #fff;
                height: 80rpx;
                line-height: 80rpx;
                text-align: center;
                box-sizing: border-box;
                border-bottom: 1px solid #ebedf0;
                z-index: 10;
                position: relative;
            }

            .cells {
                overflow: auto;
                position: relative;
                box-sizing: border-box;
                border-right: 1px solid #ebedf0;
            }

            .cell {
                box-sizing: border-box;
                height: 60rpx;
                width: v-bind(roomDomLength);
                border-bottom: 1px solid #ebedf0;
                display: flex;
                flex-direction: column;

                .inner_cell {
                    height: 60rpx;
                    line-height: 60rpx;
                    text-align: center;
                }

                &.defaultSelected {
                    background: $uni-color-primary;
                    color: #fff;
                    border-bottom: none;
                }

                &.selectedByTapTime:not(.defaultSelected) {
                    background: rgba(33, 150, 243, 0.2)
                }

                &.selected:not(.defaultSelected.selectedByTapTime) {
                    background: rgba(33, 150, 243, 0.5)
                }

            }
        }

    }
</style>