import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'

let item = createSlice({
    name: 'item',
    initialState: [
        { id: 0, name: 'white and black', count: 2 },
        { id: 2, name: 'grey yordan', count: 1 }
    ],
    reducers: {
        addCart(state, action) {
            let number = state.findIndex((a) => a.id === action.payload)
            state[number].count++
        },
        addItem(state, action) {
            let 찾은상품 = state.find(x => x.id === action.payload.id)
            찾은상품 ? 찾은상품.count++ : state.push(action.payload)
        }
    }
})

export let { addCart, addItem } = item.actions
export default configureStore({
    reducer: { user: user.reducer, item: item.reducer, }
})