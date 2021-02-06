import {fetchOptionList, fetchPatentTypeList, fetchPatentStatusList} from '@/api/options'

const state = {
    patent_type: [],
    patent_status: [],
    sell_status: [
        {id: 0, name: '未发布'},
        {id: 5, name: '已下架'},
        {id: 1, name: '待交易'},
        {id: 2, name: '已预订'},
        {id: 3, name: '已付款'},
        {id: 4, name: '交易完成'},
    ],
    monitor_status: [
        {id: 2, name: ''},
        {id: 2, name: ''},
        {id: 2, name: ''},
        {id: 2, name: ''},
        {id: 2, name: ''},
    ]
}

const mutations = {
    SET_PATENT_TYPE: (state, patent_type) => {
        if (patent_type.constructor === Array) {
            state.patent_type = patent_type
        }
    },
    SET_PATENT_STATUS: (state, patent_status) => {
        if (patent_status.constructor === Array) {
            state.patent_status = patent_status
        }
    }
}

const actions = {
    getOptions({commit, state}) {
        return new Promise((resolve, reject) => {
            fetchOptionList().then(response => {
                const {data} = response
                if (!data) {
                    reject('Option Error')
                }
                const {patent_type, patent_status} = data

                //commit('SET_PATENT_TYPE', patent_type)
                commit('SET_PATENT_STATUS', patent_status)

                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    patentTypeOption({commit, state}) {
        return new Promise(resolve => {
            const data = [
                {key: 1, name: '发明专利'},
                {key: 2, name: '实用新型'},
                {key: 3, name: '外观设计'}
            ]
            resolve(data)
            return
            if (state.patent_type.length > 0) {
                resolve(state.patent_type)
                return
            }
            fetchPatentTypeList().then(res => {
                const patent_type = []
                const data = Object.values(res.data)
                for (let item of Object.values(data)) {
                    patent_type.push({
                        key: item.id,
                        name: item.name
                    })
                }
                commit('SET_PATENT_TYPE', patent_type)
                resolve(patent_type)
            }).catch(err => {
            })
        })
    },
    patentStatusOption({commit, state}) {
        return new Promise(resolve => {
            if (state.patent_status.length > 0) {
                resolve(state.patent_status)
                return
            }
            fetchPatentStatusList().then(res => {
                const patent_status = []
                const data = Object.values(res.data)
                for (let item of Object.values(data)) {
                    patent_status.push({
                        key: item.id,
                        name: item.name
                    })
                }
                commit('SET_PATENT_TYPE', patent_status)
                resolve(patent_status)
            }).catch(err => {
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
