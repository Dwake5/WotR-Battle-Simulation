## WotR Battle Simulator

This is app simulates a large amount of battles for the boardgame War of the Ring and displays the results and chance of them occuring.

According to popular website Board Game Geek (BGG), it the second most complex board game there is (although number 1 is a bit of a joke and takes 40000 minutes to complete). It has an intricate combat system with about 220 minatures and many types and classifications of units, and different types of terrain. 

As testimount to its complexity the game has a 50 A4 page rulebook, games take 3 hours, although the first one will commonly take 5-10 hours. It takes about 5 games before you have a basic understanding of the game. And despite being out for nearly 10 years, niche questions still pop up, with the proffesionals normally not having an answer due to all the intricies involved. 

It is a popular board game and is ranked 13th most popular on BGG with frequent tournaments, its own subreddit, and a popular forum. Once complete I will put this project onto the subreddit in hopes that people can gain some use out of it, and at the very least find it interesting.


## How Battles Work

*Regular 6 sided dice are rolled in all circumstances*

There are two win conditions for the main game for each side. The evil player is mainly trying to take Forts and Strongholds to gain Victory Points, thus most battles take place in these. 

The three types of terrain are: Field, Fort, Stronghold. 
There are three types of units for each side: Regular, Elites and Leaders.
Themetacilly regulars and elites are a small army and leaders represent a single unit such as a king or military captain.
A maximum of 10 combined regulars and elites can be in a battle. Any more are discarded.
Elites have double the health of regulars and have additional capabilites is siege's. 
Leaders are more like supporting units, and can not be killed. But all are killed if there accompanying army perishes.

Battles in fields:
This is the most basic type of battle. Players fight in unison, taking thier turn at the same time. 
For each side; first the combat strength is determined. This is regulars and elites combined up to a maximum of 5. 
This number of dice are rolled. ( main army attacks )
Any at 5+ are hits. 
For each missed dice, a single leader can re-roll one of these, again hitting on a 5. ( leaders encourage soldiers to keep fighting )
Then casualties are removed based on 5+ dice rolls. Elites can take 1 damage to be reduced to regulars. 
Then we move onto the next combat roll.


Battles in forts:
A fort battle is very similiar to a field. The only difference is that on the first round of combat the attacker needs a 6 to hit, rather than a 5.
After that both sides need 5+'s to hit as usual.

I was surprised at how effective a fort was in combat, and gave the defender about a 70% chance of winning against an equal size army. Which would be 50% on a field.


Battles in Strongholds:
These battles are more invovled and have additional rules.
On the map the defending army will be on top of a stronghold, when attacked. They have the option of fighting a field battle using normal rules, until they wish to go inside the stronghold. 
This is because whilst a regular army can have a maximum of 10 units, a stronghold can only hold 5.
Once inside, the attacker will need to use an action dice ( not a combat dice, will not be explainedotherwise this readme would become 20 pages long ) to attack inside. 

Now when attacking inside a stronghold, the attacker only scores a hit on a roll of 6. 
Instead of rounds continuing automatically, the attacker must either 1. downgrade an elite to a regular to extend the battle by one round. 2. Use another action dice to play another round of combat.
Based on my knowledge and experience with the game, it is overwhelmingly likely that a unit is downgraded, and my simulation will take that into account. And will report if you won or run out of elites to downgrade.

Due to this downgrading mechanic, when you are deciding which units are being downgraded there is a general algorithm to follow, both trying to optimizie for having a high number of units so that you can get the maximum 5 combat role, but also that you have enough elites to keep the attack going. My simulation kills units as a proffesional player would in the most optimal way. 

## An Example Battle

Equal sides of 3 regulars, 1 elites, and 2 leaders will fight on a fortfication, I will use a function to roll dice:
Round 1
Attacker [3,1,2] (hitting on 6)
Rolls: 4,4,5,5 (no hits)
There are 4 missed dice, 2 leaders encourage 2 to reroll. 
Rolls 5,6 (1 hit)

Defender [3,1,2] (hitting on 5)
Rolls: 2,3,3,4 (no hits)
There are 4 missed dice, 2 leaders encourage 2 to reroll. 
Rolls: 1,5 (1 hit)

Both sides take 1 damage, in order to preserve 4 dice being rolled both downgrade the elite.

Round 2
Attacker [4,0,2] (hitting on 5)
Rolls: 2,3,5,5 (2 hits)
There are 2 missed dice, 2 leaders encourage 2 to reroll. 
Rolls: 1,5 (1 hit)
3 total hits

Defender [4,0,2] (hitting on 5)
Rolls: 2,3,4,5 (1 hit)
There are 3 missed dice, 2 leaders encourage 2 to reroll. 
Rolls: 2,4 (0 hits)
1 total hit

Both sides now have no choice but to reduce regulars

Round 3
Attacker [3,0,2] (hitting on 5)
Rolls: 2,3,5 (1 hit)
There are 2 missed dice, 2 leaders encourage 2 to reroll. 
Rolls: 2,6 (1 hits)
2 total hits (although they already won after the first)

Defender [1,0,2] (hitting on 5)
Rolls: 4 (no hit)
There are 1 missed dice, 2 leaders encourage 1 to reroll. ( a missed dice can only be rerolled once, excess leaders do nothing)
Rolls: 4 (no hits)
0 total hits.

The battle is now over, the attacker ends with [3,0,2] units and capturers the Fort, the defender has lost all his units including leaders.


