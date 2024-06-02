//创建各种验证规则
//账号验证
//loginIdValidator是对象，是返回了一个包含FieldValidator属性和方法的对象，所以u1.validate有值；FieldValidator是函数，里边没有validate的方法，但因为函数也是对象，所以它向原型链上查找，因为原型链里边没有值，所以返回undefind
//账号验证

const loginIdValidator = new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '淦你大爷的，为啥不填账号？'
    }
    const resp = await API.exists(val)
    if(resp.data){
        return 'sb，有人注册过了'
    }
})
//昵称验证
const nickNameValidator = new FieldValidator('txtNickname',async function(val){
    if(!val){
        return '淦你大爷的，不写名字？'
    }
})

const loginPwdValidator = new FieldValidator('txtLoginPwd',async function(val){
    if(!val){
        return '淦你大爷的，为啥不写密码？'
    }
})

const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',async function(val){
    if(!val){
        return '淦你大爷的，不写密码？'
    }
    if(val === loginPwdValidator.input.value){
        return ''
    }
    else{
        return '密码不对！'
    }
})

const form = $('.user-form')
form.onsubmit = async function(e){
    e.preventDefault()
    const result = await FieldValidator.validate(loginIdValidator,nickNameValidator,loginPwdValidator,loginPwdConfirmValidator)
    if(!result){
        return
    }
    
    // const formData = new FormData(form)
    // const data = Object.fromEntries(formData.entries())

    const data = {
        loginId: loginIdValidator.input.value,
        loginPwd: loginPwdValidator.input.value,
        nickName: nickNameValidator.input.value,
    }

    const resp = await API.reg(data)
    if(resp === 0){
        alert('注册成功')
        location.href = './login.html'
    }
}