/**
 * 增加finally方法
 */
/* eslint-disable */
export default function () {
  if (!Promise.prototype.finally) {
    Promise.prototype.finally = function (callback) {
      let P = this.constructor
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason =>
          P.resolve(callback()).then(() => {
            throw reason
          })
      )
    }
  }
}
