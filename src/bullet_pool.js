

class BulletPool {
    constructor(maxsize) {
        this.pool = new Float32Array(4*maxsize)
        this.end = 0
        this.max = maxSize
    }

    add(position, velocity) {
        if(this.end < this.max) {
            this.pool[this.end*4] = position.x
            this.pool[this.end*4+1] = position.y
            this.pool[this.end*4+2] = velocity.x
            this.pool[this.end*4+3] = velocity.y
            this.end++
        }
    }

    update(elapsedTime, callback) {
        for(let i=0; i<this.end; i++) {
            this.pool[4*i] += this.pool[4*i+2]
            this.pool[4*i+1] += this.pool[4*i+3]
        }
        if(callback({x:this.pool[4*i], y:this.pool[4*i+1]}) {
            this.pool[4*i] = this.pool[4*(this.end-1)]
            this.pool[4*i+1] = this.pool[4*(this.end-1)+1]
            this.pool[4*i+2] = this.pool[4*(this.end-1)+2]
            this.pool[4*i+3] = this.pool[4*(this.end-1)+3]
            i--
            this.end--
        }
    }

    render(elapsedTime, ctx) {
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = 'black'
        for(let i=0; i<this.end; i++) {
            ctx.moveTo(this.pool[4*i], this.pool[4*i+1])
            ctx.arc(this.pool[4*i], this.pool[4*i+1], 2, 0, 2*Math.PI)
        }
        ctx.stroke()
    }
}
