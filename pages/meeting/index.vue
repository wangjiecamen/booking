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
                        @click="onClickCell(i,time_index)" class="cell" v-for="(i,time_index) in item.cell"
                        :key="room_index+'_'+time_index">
                        <div class="inner_cell"
                            v-if="(item.cell[time_index-1]?!item.cell[time_index-1].id:false)&&i.defaultSelected">
                            {{i.branch}}
                        </div>
                    </div>

                </div>
            </div>
        </scroll-view>

        <van-dialog id="van-dialog" />
    </div>

    <view v-if="showSubmitBtn" class="sumbit_btn" @click="submit">确定</view>

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
    import dropright from 'lodash.dropright'
    import drop from 'lodash.drop'
    import Dialog from "@/wxcomponents/vant/dialog/dialog";
    const weekStr = getWeekStr()
    const currentDateIndex = ref(0)
    const scrollTop = ref(0)
    const roomDomLength = ref('200rpx')
    const showSubmitBtn = ref(false)
    const timeList = getTimeList()
    let lastIndexSelectedByTapTime = null
    let lastCellSelectedByTapCell = {}
    let selectedCells = []
    let completeCellSelected = false
    let completeTimeSelected = false

    const roomList = ref([{
        roomId: 0,
        roomName: '会议室A',
        meeting: [{
                start: '09:30',
                end: '10:30',
                remark: 'remark',
                branch: '产品部',
                branchId: '29',
                id: '1'
            },
            {
                start: '12:30',
                end: '13:00',
                remark: 'remark1',
                branch: '产品部',
                branchId: '30',
                id: '3'
            }
        ]

    }, {
        roomId: 1,
        roomName: '会议室B',
        meeting: [{
            start: '16:00', //16:00 16:30,17:00 17:30 18:00   
            end: '18:30',
            remark: 'remark',
            branch: '产品部',
            branchId: '90',
            id: '7'
        }, ]
    }, {
        roomId: 2,
        roomName: '会议室C',
        meeting: []
    }, {
        roomId: 3,
        roomName: '会议室D',
        meeting: []
    }, {
        roomId: 4,
        roomName: '会议室E',
        meeting: []
    }, {
        roomId: 5,
        roomName: '会议室F',
        meeting: []
    }])
    const currentMonth = computed(() => {
        const m = getWeeks()[currentDateIndex.value].getMonth() + 1
        return String(m).padStart(2, '0')
    })
    const roomDomTotalLength = computed(() => {
        return roomList.value.length * parseInt(roomDomLength.value) + 'rpx'
    })
    const selectDate = (index) => {
        currentDateIndex.value = index
    }
    const onTimeScroll = (event) => {
        scrollTop.value = -(event.detail.scrollTop)
    }
    const submit = () => {
        const cells = selectedCells.filter(i => i.selected)
        console.log(cells)
        const startTime = cells[0].time
        let endTime = cells[cells.length - 1].time
        const [e, e_h] = endTime.split(":")
        if (e_h === '00') endTime = e + ':30'
        if (e_h === '30') endTime = Number(e) + 1 + ':00'
        const result = {
            roomId: cells[0].roomId,
            start: startTime,
            end: endTime,
            date: new Date().getFullYear() + '-' + currentMonth.value + '-' + weekStr[currentDateIndex.value].d

        }
        console.log(result)

    }
    const onClickCell = (cell, time_index) => {
        console.log(cell)
        if (cell.defaultSelected) {
            Dialog.confirm({
                showCancelButton: false,
                message: `部门：${cell.branch}\n备注：${cell.remark}`,
            })
        } else {
            cell.selected = !cell.selected
            selectedCells = getCellsByRoomId(cell.roomId)
            if (lastCellSelectedByTapCell.roomId !== cell.roomId) {
                const lastCells = getCellsByRoomId(lastCellSelectedByTapCell.roomId)
                lastCells.forEach(i => i.selected = false)
                completeCellSelected = false
            } else {
                const index = timeList.findIndex(i => i === cell.time)
                if (completeCellSelected) {
                    selectedCells.forEach((_, i) => selectedCells[i].selected = i === index)
                    completeCellSelected = false
                    lastCellSelectedByTapCell = cell
                    return
                }
                const lastIndex = timeList.findIndex(i => i === lastCellSelectedByTapCell.time)
                const minIndex = Math.min(lastIndex, index)
                const maxIndex = Math.max(lastIndex, index)
                let i = minIndex
                while (maxIndex - i > 0) {
                    if (selectedCells[i].defaultSelected) {
                        Dialog.confirm({
                            showCancelButton: false,
                            message: `会议室已被其他部门占用，请重新选择`,
                        }).then(() => {
                            selectedCells.forEach((_, i) => selectedCells[i].selected = false)
                            showSubmitBtn.value = false
                        })
                        break
                    }
                    i++
                    selectedCells[i].selected = true
                }
                completeCellSelected = true
            }
            lastCellSelectedByTapCell = cell
        }
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
            console.log(minIndex, maxIndex)
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
            if (i.start && i.end) {
                const [s, s_h] = i.start.split(':')
                const [e, e_h] = i.end.split(':')
                let l = getTimeList(s, e)
                if (s_h === '30') l = drop(l, 1)
                if (e_h === '30') l = dropright(l, 1)
                if (e_h === '00') l = dropright(l, 2)
                const item = l.map(t => ({
                    id: i.id,
                    branch: i.branch,
                    branchId: i.branchId,
                    remark: i.remark,
                    time: t
                }))
                arr.push(...item)
            }
        })
        return arr
    }
    onMounted(() => {

        roomList.value.forEach(i => {
            i.cell = []
            const t = getCellOfMeeting(i.meeting)
            for (let k of timeList) {
                const targetIndex = t.findIndex(i => i.time === k)
                if (targetIndex !== -1) {
                    i.cell.push({
                        roomId: i.roomId,
                        defaultSelected: true,
                        selected: false,
                        time: k,
                        id: t[targetIndex].id,
                        branch: t[targetIndex].branch,
                        branchId: t[targetIndex].branchId,
                        remark: t[targetIndex].remark,
                        selectedByTapTime: false
                    })
                } else {
                    i.cell.push({
                        roomId: i.roomId,
                        defaultSelected: false,
                        selected: false,
                        time: k,
                        selectedByTapTime: false
                    })
                }
            }
        })

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

    .sumbit_btn {
        position: fixed;
        bottom: 20rpx;
        right: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        box-sizing: border-box;
        width: 50px;
        font-size: 12px;
        background: rgba(33, 150, 243, 0.8);
        height: 50px;
        border-radius: 50%
    }
</style>