// 用来存放项目的验证方法

// 验证账号
export function validateAcount(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    if (this.ruleForm.acount !== '') {
      this.$refs.ruleForm.validateField('checkPass')
    }
    callback()
  }
}

// 验证密码
export function validatePassword(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (this.ruleForm.password !== '') {
      this.$refs.ruleForm.validateField('checkPass')
    }
    callback()
  }
}