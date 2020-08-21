export function validMoblie(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入新的联系方式'))
  } else if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7,9]))\d{8}$/.test(value)) {
    callback(new Error('手机格式不正确'))
  } else if (value.length !== 11) {
    callback(new Error('手机号长度不正确'))
  } else {
    callback()
  }
}

export function validMoney(rule, value, callback) {
  if (value === '') {
    callback(new Error('不能为空'))
  } else if (!/^(([1-9]\d*)|\d)(\.\d{1,2})?$/g.test(value)) {
    callback(new Error('金额格式有误'))
  } else {
    callback()
  }
}

export function validNumber(rule, value, callback) {
  if (value === '') {
    callback(new Error('此项不能为空'))
  } else if (!/^[a-zA-Z0-9_-]+$/g.test(value)) {
    callback(new Error('此项只能是数字字母'))
  } else if (value.length < 3) {
    callback(new Error('此项至少要三位'))
  } else {
    callback()
  }
}

export function validName(rule, value, callback) {
  if (value === '') {
    callback(new Error('账号不能为空'))
  } else if (!/^[a-zA-Z0-9_-]+$/g.test(value)) {
    callback(new Error('账号只能是数字或字符'))
  } else {
    callback()
  }
}

export function validSort(rule, value, callback) {
  if (!value && value !== 0) {
    return callback(new Error('分类权重不能为空'))
  } else if (!Number.isInteger(value)) {
    callback(new Error('分类权重必须为数字值'))
  } else if (value <= 0 || value > 100) {
    callback(new Error('分类权重必须在1-100之间'))
  } else {
    callback()
  }
}

// 学校信息密码框验证
export function validPassWorld(rule, value, callback) {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (value.length < 6) {
    callback(new Error('密码长度要大于等于6'))
  } else {
    callback()
  }
}

// 验证正整数
export function validPositiveInteger(rule, value, callback) {
  if (!(/(^[1-9]\d*$)/.test(value))) {
    callback(new Error('必须为正整数'))
  } else {
    callback()
  }
}

// 验证数字
export function validInteger(rule, value, callback) {
  if (isNaN(value)) {
    callback(new Error('必须为数字'))
  } else {
    callback()
  }
}

