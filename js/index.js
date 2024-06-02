(async function(){
    const resp = await API.profile()
    const user = resp.data

    if(!user){
        alert('请重新登录')
        location.href = './login.html'
        return
    }

    const doms = {
        aside: {
            nickName: $('#nickname'),
            loginId: $('#loginId')
        },
        close: $('.close'),
        chat: $('.chat-container'),
        text: $('#txtMsg'),
        button: $('.msg-container button')
    }

    doms.close.onclick = function(){
        API.loginOut()
        location.href = './login.html'
    }

    doms.aside.nickName.innerText = user.nickname
    doms.aside.loginId.innerText = user.loginId
    
    function addChat(chatInfo){
        //chatInfo是一个对象，里边是对话
        const div = $$$('div')
        div.classList.add('chat-item')
        if (chatInfo.from) {
            div.classList.add('me')
        }

        const img = $$$('img')
        img.classList.add('chat-avatar')
        img.src = chatInfo.from ? './asset/avatar.png' :"./asset/robot-avatar.jpg"

        const content = $$$('div')
        content.classList.add('chat-content')
        content.innerText = chatInfo.content

        const date = $$$('div')
        date.classList.add('chat-date')
        date.innerText = formatDate(chatInfo.createdAt)

        div.appendChild(img)
        div.appendChild(content)
        div.appendChild(date)

        doms.chat.appendChild(div)

    }

    function formatDate(timestamp){
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2,'0')
        const day = date.getDay().toString().padStart(2,'0')
        const hour = date.getHours().toString().padStart(2,'0')
        const minuite = date.getMinutes().toString().padStart(2,'0')
        const second = date.getSeconds().toString().padStart(2,'0')

        return `${year}-${month}-${day} ${hour}:${minuite}:${second}`
    }


    async function createHistory(){
        const history = await API.getHistory()
        const result = history.data
        for (const [i,item] of result.entries()) {
            addChat(item)
            if(i>10){
                scrollBottom()
                return
            }
        }

    }

    function scrollBottom(){
        console.log(doms.chat.scrollHeight)
        doms.chat.scrollTop = doms.chat.scrollHeight
    }
    createHistory()



    //先把文本框的内容变成对象，放在对话框中
    //根据发送文本框的对象内的content，在服务器中查找，找到content相同的对象，将机器人的回话放在对话框中
    //根据发送的内容，找到机器人的对象，返回content

    //不用这么麻烦，直接使用sendchat函数，让服务器返回结果
    doms.button.onclick = async function(e){
        e.preventDefault()
        const content = doms.text.value
        if(!content){
            return
        }
        const timestamp = new Date().getTime()
        addChat({
            from: user.loginId,
            to: null,
            content,
            createdAt:timestamp
        })
        doms.text.value = ''
        scrollBottom()

        const result = await API.sendChat(content)
        console.log(result)
        addChat(result.data)
        scrollBottom()
        
    }

    

})()