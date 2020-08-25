const calculateHP = (hp) => parseInt(hp) > 100 ? 100 : hp

const calculateStrength = (attacks) => {
    const attackMulitplier = attacks.length * 50;
    return attackMulitplier > 100 ? 0 : attackMulitplier
} 

const calculateWeakness = (weaknesses) => {
    const weaknessMultiplier = weaknesses.length * 100;
    console.log(`weakness length=${weaknesses.length}`)
    return weaknessMultiplier > 100 ? 0 : weaknessMultiplier
}

const calculateDamage = (attacks) => {
    let totalDamage = 0;
    attacks.forEach(a => {
        let val = a.damage.match(/[0-9]+/)
        totalDamage += val ? parseInt(val[0]) : 0
    })
    return totalDamage
}

const calculateHappiness = (hp, damage, weakness) => {
    return ((hp / 10) + (damage / 10 ) + 10 - (weakness)) / 5
}

export class Pokemon {
    constructor({id, name, type, hp, attacks, weaknesses, imageUrl}) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.imageUrl = imageUrl;    
        this.hp = calculateHP(hp);
        this.strength = calculateStrength(attacks);
        this.weakness = calculateWeakness(weaknesses);
        this.damage = calculateDamage(attacks);
    }

    get happiness() {
        return calculateHappiness(this.hp, this.damage, this.weakness)
    }
}
