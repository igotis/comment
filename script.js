
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
                    <button  v-on:click="userAdd">Add comment</button>
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
    props: ["user", "index", "stat", "time"],
    template: `<div class="comment col-md-8">
                    <p class="User line"> <em><u>User:<u></em> {{user.name}}</p>
                    <p class="comment-line "> <em><u>Comment:</u></em> {{user.comment}} </p>
                    <p><em><u>Estimate:</u></em> {{user.stat}} </em></p>
                    <p><em><u>Time of comment:</u>{{user.time}}</p>
                    <i>Edit current comment:</i><input type="text" v-model="user.comment" /> 
                    <button  @click="userDelete(index)">Delete comment</button>
                    <button  @click="commenting(index)">Comment this</button>

                </div>`,
    methods: {
        userDelete: function(index){
            this.$emit('userdelete', index);},
        commenting: function(){
            console.log (this.user.comment)}
        
        
    }
});



new Vue({
    el: "#app",
    data: {
        users:[],
        stat: statistic

    },

    

    methods:{
        remove: function(index){
            this.users.splice(index, 1)
        },
        commentthis: function(){}
    }
});

