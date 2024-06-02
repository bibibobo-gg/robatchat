
//对某一个表单项进行验证的通用代码
//通用的方法和数据
class FieldValidator {
    //传入id，验证函数
    //construor是构造函数的变形，原本在函数外传参，现在在constructor里传参
    constructor(txtId,validatorFunc){
        this.input = $('#' + txtId)
        this.validatorFunc = validatorFunc
        this.p = this.input.nextElementSibling
        this.input.onblur = ()=>{
            this.validate()
        }
    }

    //validate函数相当于把一个方法放在原型中
    //执行期上下文，validate函数提升
    async validate(){
        const err = await this.validatorFunc(this.input.value)
        if(err){
            this.p.innerText = err
            return false
        }
        else{
            this.p.innerText = ''
            return true
        }
    }

    //静态方法
    static async validate(...validators){
        const arr = await validators.map(v=>v.validate())
        const result = await Promise.all(arr)
        return result.every(v=>v)
    }
}

