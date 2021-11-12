const times = (docs) => {
    const timeDates = docs.map(a=>a.created_at)
    const time = timeDates.map(a=>a.getHours()+ ':' +  a.getMinutes()+ ':' +  a.getSeconds())
    return time
}

const dates = (docs) => {
    const timeDates = docs.map(a=>a.created_at)
    const dates = timeDates.map(a=>String(a.getDate() + '/' + a.getMonth() + '/' + a.getFullYear()))
    return dates
}

module.exports = {times, dates}
