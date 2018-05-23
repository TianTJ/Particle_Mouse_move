
cc.Class({
    extends: cc.Component,

    properties: {
        Particle: {
            default: null,     
            type: cc.Prefab,
        },
        layout: {
            default: null,     
            type: cc.Layout,
        }
    },
    onLoad () {
        this.initui()
    },
    initui: function(){ 
        var self  = this
        this.layout.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.log("touch_stat")
            var stat_pos = self.layout.node.convertTouchToNodeSpace(event.touch)
            cc.log(stat_pos)
            self.layout.node.addChild(self.add_Particle(stat_pos))
        })
        this.layout.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var move_pos = self.layout.node.convertTouchToNodeSpace(event.touch)
            if(move_pos.x > self.layout.width){return}
            if(move_pos.y > self.layout.height){return}
            cc.log("touch_move")
            if(self.layout.node.getChildByName("Particle_Test")){
                self.layout.node.getChildByName("Particle_Test").x=move_pos.x
                self.layout.node.getChildByName("Particle_Test").y=move_pos.y
            }
        })
        this.layout.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.log("touch_end")
            if(self.layout.node.getChildByName("Particle_Test")){
                self.layout.node.removeChild(self.layout.node.getChildByName("Particle_Test"))
            }
        })
    },
    add_Particle: function(pos){
        var newParticle = cc.instantiate(this.Particle);
        newParticle.x=pos.x;newParticle.y=pos.y
        newParticle.name = "Particle_Test"
        newParticle.zIndex = 9999
        return newParticle
    },  
    start () {

    },

    // update (dt) {},
});
