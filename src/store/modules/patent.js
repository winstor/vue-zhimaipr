import {fetchOptionList, fetchPatentTypeList, fetchPatentStatusList} from '@/api/options'

const state = {
    typeOptions: [],
    statusOptions: [],
    sellOptions: [
        {id: 0, name: '未发布'},
        {id: 5, name: '已下架'},
        {id: 1, name: '待交易'},
        {id: 2, name: '已预订'},
        {id: 3, name: '已付款'},
        {id: 4, name: '交易完成'},
    ],
    monitorOptions: [
        {id: 2, name: '待维护'},
        {id: 1, name: '年费正常'},
        {id: 3, name: '年费警告'},
    ]
}

const mutations = {
    SET_TYPE_OPTIONS: (state, types) => {
        if (types.constructor === Array) {
            state.typeOptions = types
        }
    },
    SET_STATUS_OPTIONS: (state, patent_status) => {
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
    getTypeOptions({commit, state}) {
        return new Promise(resolve => {
            // const data = [
            //     {key: 1, name: '发明专利'},
            //     {key: 2, name: '实用新型'},
            //     {key: 3, name: '外观设计'}
            // ]
            // resolve(data)
            // return
            if (state.typeOptions.length > 0) {
                resolve(state.typeOptions)
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
                commit('SET_TYPE_OPTIONS', patent_type)
                resolve(patent_type)
            }).catch(err => {
            })
        })
    },
    getStatusOption({commit, state}) {
        return new Promise(resolve => {
            if (state.statusOptions.length > 0) {
                resolve(state.statusOptions)
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
                commit('SET_STATUS_OPTIONS', patent_status)
                resolve(patent_status)
            }).catch(err => {resolve([])})
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
