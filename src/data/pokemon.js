const calculateHP = (hp) => hp > 100 ? 100 : 0 //maximum is 100. if value is higher than 100 set it to 100, otherwise 0.


// use attacks length to multiply by 50, maximum is 100. e.g. if value is 1 set it to 50, 2 set it to 100, otherwise 0.     
const calculateStrength = (attacks) => {
    const attackMulitplier = attacks.length * 50;
    return attackMulitplier > 100 ? 0 : attackMulitplier 
}

// use weaknesses length multiply by 100, maximum is 100. e.g. if value is 1 set it to 100, otherwise 0.
const calculateWeakness = (weaknesses) => {
    const weaknessMultiplier = weaknesses.length * 100;
    return weaknessMultiplier > 100 ? 0 : weaknessMultiplier
}


// use damage value without symbol of all attacks skill. e.g. 50+ set it to 50, 20* set it to 20, otherwise 0.
const calculateDamage = (attacks) => {
    let totalDamage = 0;
    attacks.forEach(a => {
        let val = a.damage.match(/[0-9]+/)
        totalDamage += val ? parseInt(val[0]) : 0
    })
    return totalDamage
}

// ((HP / 10) + (Damage /10 ) + 10 - (Weakness)) / 5
const calculateHappiness = (hp, damage, weakness) => {
    //return ((hp / 10) + (damage / 10) + 10 - (weakness)) / 5
    // The original formula returns negative values for happiness across the board as weakness is on average 100 and is not divided by 10.
    
    return Math.abs((hp / 10) + (damage / 10) + 10 - (weakness)) % 5
}

export class Pokemon {
    constructor({ id, name, type, hp, attacks, weaknesses, imageUrl }) {
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
