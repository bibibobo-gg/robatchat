const loginIdValidator = new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '淦你大爷的，为啥不填账号？'
    }
})


const loginPwdValidator = new FieldValidator('txtLoginPwd',async function(val){
    if(!val){
        return '淦你大爷的，为啥不写密码？'
    }
})



const form = document.querySelector('.user-form')
form.onsubmit = async function(e){
    e.preventDefault()
    const result = await FieldValidator.validate(loginIdValidator,loginPwdValidator)
    if(!result){
        return 
    }
    
    // const formData = new FormData(form)
    // const data = Object.fromEntries(formData.entries())

    const data = {
        loginId: loginIdValidator.input.value,
        loginPwd: loginPwdValidator.input.value,
    }

    const resp = await API.login(data)
    if(resp.code === 0){
        alert('好')
        location.href = './index.html'
    }
}
