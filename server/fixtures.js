if (Signups.find().count() === 0) {
  for (date in _.range(5)) {
    for (time in _.range(8)) {
      Signups.insert({
        slot: [Number(date), Number(time)],
        userId: undefined
      })
    }
  }
}