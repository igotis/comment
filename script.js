

let statistic=0;

Vue.component('userform', {
    props: ["users"],
    data: function () {
        return {
            user: {name:'', comment:'', stat:'', time:'', parentId:0 }
        }
    },
    template: `<div>
                    <i>Enter your name </i><input type="text" v-model="user.name" />
                    <i>Add your comment </i><input type="text" v-model="user.comment" /> <br>
                    <i>Estimate us please:</i>
                    <input type="radio" id="one" value=Positive v-model="user.stat">
                    <label for="one">Positive</label>
                    <input type="radio" id="two" value=Negative v-model="user.stat">
                    <label for="two">Negative</label><br>
                    <button  @click="userAdd">Add comment</button>
                </div>`,
    methods: {
        userAdd: function(event){
            this.users.push({name:this.user.name, comment: this.user.comment, stat:this.user.stat, time:new Date(), parentId:this.user.parentId });
            if (this.user.stat=="Positive") {statistic++} else if (this.user.stat=="Negative") {statistic--};
            document.getElementById('stat').innerHTML ="Statistics:" +  statistic;


        }
    }
});

Vue.component('useritem', {
    props: ["user", "index", "comment", "stat", "time", "users"],
    data: function () {
        return {
            user: {name:'', comment:'', stat:'', time:'', parentId:0 }
        }
    },
    template: `<div class="comment col-md-8 col-md-push-4">
                    <p class="User line"> <em><u>User:<u></em> {{user.name}}</p>
                    <p class="comment-line "> <em><u>Comment:</u></em> {{user.comment}} </p>
                    <p><em><u>Estimate:</u></em> {{user.stat}} </em></p>
                    <p><em><u>Time of comment:</u>{{user.time}}</p>
                    <i>Edit current comment:</i><input type="text" v-model="user.comment" /> 
                    <button  @click="userDelete(index)">Delete comment</button>
                    <button  @click="userAdd">Comment this</button>
                    
                    
                </div>`,
    methods: {
        userDelete: function(index){
            this.$emit('userdelete', index);},
        commenting: function(){
            console.log (this.user.comment)},
        userAdd: function(event){
            this.users.push({name:this.user.name, comment: this.user.comment,  time:new Date(), parentId:this.user.parentId });
            if (this.user.stat=="Positive") {statistic++} else if (this.user.stat=="Negative") {statistic--};
            document.getElementById('stat').innerHTML ="Statistics:" +  statistic;
        }



    }
});

import axios from 'axios'
import VueAxios from 'vue-axios'

new Vue({
    el: "#app",
    data: {
        users:[],
        stat: statistic


    },



    methods: {
        remove: function (index) {
            this.users.splice(index, 1)
        },
        formSubmit(e) {
            e.preventDefault();
            let currentObj = this;

        },
        getComments(){
            this.axios.post('http://mrt.lutsk.ua/comments/api/api.php', {
                action: "index"
            })
                .then(function (response) {
                    console.log(response.data);
                    this.users = JSON.stringify(response.data).message;
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
        },
        commentthis: function(){},
    },
    mounted() {
        this.getComments();
    }
})
