<template>
  <div class="loginContainer">
    <div class="form">
      <h1>后台管理系统</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="acount">
          <el-input type="text" v-model="ruleForm.acount" autocomplete="off"></el-input>
        </el-form-item>
        <div class="passwordBox">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" ref="password"></el-input>
            <i class="el-icon-open" @click="showPassword" v-if="showPass"></i>
            <i class="el-icon-turn-off" @click="hidePassword" v-else></i>
          </el-form-item>
        </div>
        <el-form-item label="验证码" prop="code">
          <div class="verityBox">
            <el-input v-model.number="ruleForm.code"></el-input>
            <img :src="codeSrc" alt="" height="40px" @click="getCapthca">
          </div>
        </el-form-item>
        <el-form-item class="loginBox">
          <el-button type="primary" @click="submitForm('ruleForm')" class="loginInBtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCapthcaImg, loginRequest } from '@/request/api.js'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 图片验证码路径
      codeSrc: '',
      codeVal: '',
      showPass: false,
      ruleForm: {
        acount: 'qdtest1',
        password: '123456',
        code: '888888'
      },
      // 设置规则
      rules: {
        acount: [
          {
            required: true, //设置必填项
            message: '账号不能为空',
            trigger: 'blur'
          },
          { validate: this.validateAcount, trigger: 'blur' }
        ],
        password: [
          {
            required: true, //设置必填项
            message: '密码不能为空',
            trigger: 'blur'
          },
          { validate: this.validatePassword, trigger: 'blur' }
        ],
        code: [
          {
            required: true, //设置必填项
            message: '验证码不能为空',
            trigger: 'blur'
          },
          { validate: this.validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['mapMutations']),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await loginRequest({
            username: this.ruleForm.acount,
            password: this.ruleForm.password,
            code: this.ruleForm.code,
            uuid: localStorage.getItem('edb-captcha-uuid')
          })
          if (res.code == 200) {
            // 登录成功后提示
            this.$message({
              message: '成功登录',
              type: 'success'
            })
            // 移除uuid
            localStorage.removeItem('edb-captcha-uuid')
            // 保存token
            localStorage.setItem('edb-authorization-token', res.token)
            // 跳转页面
            this.$router.push({ path: '/home' })
          } else {
            console.log(res)
            this.$message({
              message: res.msg,
              type: 'warning',
              duration: 4000
            })
          }
        } else {
          // 校验不通过
          this.$message({
            message: '请输入正确的参数再进行提交',
            type: 'warning',
            duration: 4000
          })
          return false
        }
      })
    },
    async getCapthca() {
      let res = await getCapthcaImg()
      if (res.code == 200) {
        // 拼接图片的base64位地址
        this.codeSrc = 'data:image/gif;base64,' + res.img
        // 保存uuid 方便登录时用
        localStorage.setItem('edb-captcha-uuid', res.uuid)
      } else {
        this.$message({
          message: res.msg,
          type: 'warning',
          duration: 4000
        })
      }
    },
    hidePassword() {
      this.$refs.password.$refs.input.type = 'text'
      this.showPass = true
    },
    showPassword() {
      this.$refs.password.$refs.input.type = 'password'
      this.showPass = false
    }
  },
  created() {
    // 验证码请求
    this.getCapthca()
    // 清除menuData数据
    this.setMenuData([])
  }
}
</script>

<style lang='less' scoped>
.loginContainer {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/backgroundImg.jpg') no-repeat center;
  background-size: 100% 100%;
  object-fit: contain;
  .form {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    padding-top: 45px;
    padding-right: 60px;
    width: 400px;
    height: 290px;
    background-color: #fff;
    border-radius: 15px;
    h1 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      margin-left: 65px;
      text-align: center;
    }
    .verityBox {
      display: flex;
      input {
        flex: 3;
      }
      img {
        flex: 1;
      }
    }
    .loginInBtn {
      width: 100%;
    }
    ::v-deep .loginBox .el-form-item__content {
      margin-left: 40px !important;
    }
    .passwordBox {
      position: relative;
      i {
        position: absolute;
        top: 30%;
        right: 14%;
        font-size: 18px;
      }
    }
  }
}
</style>