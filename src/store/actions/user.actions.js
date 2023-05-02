export function spendBalance(amount) {
    console.log('amount:', amount)
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'SPEND_BALANCE', amount})
        } catch (error) {
            console.log('error:', error)
        }
    }
}