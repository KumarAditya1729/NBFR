# 📖 NBRF Sanity Guide — Purane Data Ko Kaise Badalna Ya Edit Karna Hai?
*(Is 1-page guide ko padh kar aap website par dikh rahe kisi bhi purane data ko aaram se badal sakte hain)*

---

## 🧐 Pehle Pehchanein: Data Kahan Se Aa Raha Hai?

Jab aap website par koi purana data (Jaise Research Paper, Event, Photo, ya Number) dekhte hain aur use badalna chahte hain, to sabse pehle **Sanity Studio (`http://localhost:3000/studio`)** kholein aur us category mein dekhein.

Yahan 2 situations (sthititiyan) hongi:

---

### 🟢 Situation 1: Wo Data Studio Ki List Mein Pehle Se Dikhta Hai
*(Matlab wo data pehle kisi ne Sanity CMS se hi banaya tha)*

#### Step-by-Step Edit Karne Ka Tarika:
1. Left sidebar se category chunein *(Jaise: **Research Publication** ya **Event**)*.
2. Beech wali list mein **us item ke naam par click karein**.
3. Right side mein uska form khul jayega. Wahan purana data pehle se bhara hoga.
4. **Text badalna hai to:** Purana text kaat kar naya text likh dein.
5. **Photo ya PDF badalna hai to:** Purani photo/PDF ke upar `Remove` ya `Replace` dabayein aur nayi file upload kar lein.
6. Upar right corner mein green button **`Publish`** par click kar dein.
🎉 **Aapka data turant save ho jayega aur website par live ho jayega!**

---

### 🟠 Situation 2: Wo Data Website Par Dikh Raha Hai LEKIN Studio Ki List Mein NAHI Hai
*(Matlab wo data ek **Default / Sample Fallback Data** hai jo website ke code/template mein pehle se tha)*

#### Isko Sanity Se Badalane Ka Tarika (Override):
1. Aapko Studio mein dhoondne ki zaroorat nahi hai. Seedha upar right corner mein **`+ Create`** button par click karein.
2. Us asli/naye item ka data form mein bharein *(Jaise asli Research Paper ka naam, summary, date aur PDF)*.
3. Green button **`Publish`** par click kar dein!
4. **Magic kya hoga?** Hamari website aisi bani hai ki jaise hi aap Sanity mein pehla asli item `Publish` karte hain, website **purane sample data ko hamesha ke liye chhod deti hai aur aapke naye live Sanity data ko dikhana shuru kar deti hai!**

---

## ⚡ Quick Cheat Sheet (Yaad Rakhne Ka Formula):

| Kya Karna Hai? | Kahan Click Karein? | Agla Step | Final Step |
| :--- | :--- | :--- | :--- |
| **Naya daalna hai** | Left Menu $\rightarrow$ **`+ Create`** | Form bharein | **`Publish`** dabayein |
| **Purana badalna hai (Jo list mein hai)** | Left Menu $\rightarrow$ **List se Naam par Click** | Text/Photo badlein | **`Publish`** dabayein |
| **Sample badalna hai (Jo list mein nahi hai)** | Left Menu $\rightarrow$ **`+ Create`** | Asli data bharein | **`Publish`** dabayein |
| **Purana hatana hai (Delete)** | Left Menu $\rightarrow$ **List se Naam par Click** | Top-right ke **`⋮` (3 dots)** | **`Delete`** dabayein |

---

💡 *Agar kabhi update turant na dikhe, to browser par `Ctrl + Shift + R` dabayein taaki page ka naya cache load ho jaye!*
