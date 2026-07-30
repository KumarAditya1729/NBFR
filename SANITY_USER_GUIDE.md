# 🌟 NBRF Website — Sanity CMS Complete Step-by-Step User Guide
*(Is guide ko padh kar koi bhi bina coding ya technical knowledge ke website par content Add, Edit aur Delete kar sakta hai)*

---

## 🚀 Step 1: Website ka Admin Panel (Studio) Kholna

1. Apne computer ya mobile ke internet browser (Google Chrome, Safari, ya Firefox) mein jahan website ka naam likhte hain wahan yeh URL type karein:
   - **Agar local computer par kaam kar rahe hain:** `http://localhost:3000/studio`
   - **Agar live internet website par hain:** `https://yourwebsite.com/studio`
2. Enter dabate hi **Log In** ka screen aayega.
3. **"Continue with Google"** (ya GitHub/Email) par click karein aur apna wahi Google Account chunein jisse aapko access diya gaya hai.
4. Log in hote hi aapke samne **"NBRF Admin Dashboard"** khul jayega! 🎉

---

## 📁 Step 2: Dashboard Ko Samajhna (Kis Menu Mein Kya Hota Hai?)

Left side (baayein taraf) aapko ek list dikhegi jise **Content Types** kehte hain. Yahan se aap chunein ki kya add karna hai:

| Menu ka Naam | Ismein kya add karte hain? | Website par kahan dikhega? |
| :--- | :--- | :--- |
| 📄 **Research Publication** | Research papers, Policy Briefs, Working Papers, Reports | Website ke `/publications` aur `/impact` page par |
| 📅 **Event** | Webinars, Seminars, Conferences, Meetings | Website ke Events section mein |
| 📊 **Bihar Dataset** | Bihar se judi aarthik aur samajik statistics / numbers | Website ke `/bihar` (Observatory) page par |
| 🏛️ **District Factsheet** | Bihar ke 38 zilon (Patna, Gaya, Muzaffarpur, etc.) ka data | Website ke District factsheet tables mein |
| 🤝 **Partner** | NBRF ke partners aur supporters ke logos aur naam | Homepage ke Partners section mein |
| 👤 **Expert / Team Member** | Board members ya Research experts ki details aur photo | Website ke Experts aur Team section mein |

---

## ➕ Step 3: Naya Content Kaise Add Karein (`+ Create`)

Maana ki aapko ek **Naya Research Paper ya Report** add karna hai. Step-by-step aise karein:

1. Left sidebar mein **"Research Publication"** par click karein.
2. Upar right corner (daayein kone) mein ek **Green (hara) ya Blue button** dikhega jis par likha hoga: **`+ Create`** (ya Pen 🖊️ ka icon hoga). Us par click karein.
3. Ek form khul jayega. Ab bilkul aaram se details bharein:
   - **Publication Title**: Report ka naam likhein. *(Jaise: "Rural Credit Study in North Bihar")*
   - **Slug**: Title likhne ke theek niche **`Generate`** ka button hoga. Us par click kar dein! *(Yeh apne aap link bana dega)*.
   - **Publication Type**: Dropdown par click karein aur chunein ki yeh kya hai *(Research Report, Policy Brief, Working Paper, etc.)*.
   - **Abstract / Summary**: Paper ke baare mein 3-4 line ki short summary likhein.
   - **Publish Date**: Aaj ki date select kar lein.
   - **Upload Report PDF (Optional)**: Agar koi PDF file hai to **"Upload"** button par click kar ke apne computer se PDF file select kar lein.
   - **Cover Image (Optional)**: Agar koi photo ya graphic lagana hai to image upload kar lein.
4. Sabse niche right side (ya top right) mein ek **Green button** hoga jis par likha hoga: **`Publish`** 🚀
5. **`Publish`** par click karte hi aapka naya paper website par **TURANT LIVE** ho jayega!

---

## ✏️ Step 4: Purane Data Ko Change/Edit Kaise Karein? (Complete Guide)

Agar website par pehle se koi data dikh raha hai aur aapko use badalna hai, to iske 2 cases (sthititiyan) hoti hain:

### 🌟 Situation A: Wo Data Sanity Studio ki List Mein Pehle Se Maujood Hai
*(Jaise koi Research Paper, Event, Bihar Dataset ya Expert jo pehle kisi ne Sanity se add kiya tha)*

Iske liye aapko naya item create nahi karna hai, bas existing item ko open karke badalna hai:
1. Left sidebar mein us category par click karein *(Jaise: **Research Publication** ya **Event**)*.
2. Beech wali list mein se **us item ke naam par click karein** jise badalna hai.
3. Right side mein uska form khul jayega jismein purana data pehle se bhara hoga.
4. Jo bhi badalna hai (spelling, summary, date, photo) use type karein ya purani photo/PDF ki jagah nayi upload karein.
5. Badlaav karte hi green button ka naam **`Publish`** ho jayega. Us par wapas click kar dein. Aapke changes turant save aur live ho jayenge!

### 💡 Situation B: Wo Data Website Par Dikh Raha Hai LEKIN Studio Mein Nahi Mil Raha!
*(Jaise website ka koi purana static text, sample report, ya default photo jo pehle se website ke template mein tha)*

Agar aap Studio mein dhoondte hain aur wo cheez list mein **nahi milti**, to iska matlab hai ki wo **Default Sample Data / Fallback Data** hai jo website ke code se chal raha hai.

Usko Sanity se control karne ka bilkul aasan tarika:
1. Aapko pehli baar Studio mein **`+ Create`** par click karke us asli item ko add kar dena hai.
2. **Kyon?** Kyunki hamari website aisi bani hai ki jab tak Sanity mein data nahi hota, wo purana sample/default dikhati hai. **Jaise hi aap Sanity mein asli item `Publish` kar dete hain, website turant purane sample ko hamesha ke liye chhod deti hai aur aapke Sanity wale naye live data ko dikhana shuru kar deti hai!**

---

## 🗑️ Step 5: Kisi Item Ko Permanent Delete Kaise Karein? *(Bahut Important!)*

*(Dhyan dein: Sanity Studio ke main page par Delete ka button nahi hota hai, wo item ke andar chhupa hota hai)*

Agar kisi paper ya event ko website se bilkul hatana (Delete karna) hai:

1. Left sidebar se category chunein *(Jaise: Research Publication)*.
2. Beech wali list mein se **us item par click karein jise Delete karna hai**. (Isse uska form right side mein khul jayega).
3. Form ke **top-right corner** (daayein upri kone) mein dekhein:
   - Wahan green **`Publish`** button hoga.
   - Us **green button ke theek bagal mein teen vertical bindu (`⋮` ya `...`)** baney honge.
4. Un **teen dots (`⋮`)** par click karein.
5. Ek chhota sa menu nikal kar aayega, jismein **Lal rang (Red Color)** mein likha hoga: **`Delete`** 🗑️
6. **`Delete`** par click karein aur pop-up aane par **"Delete now"** (ya confirm) kar dein.
7. Bas! Wo item wahan se hamesha ke liye delete ho jayega aur website se turant gayab ho jayega.

---

## ❓ Agar Koi Problem Aaye To Kya Karein?
- **Agar changes turant na dikhein:** Browser par `Ctrl + Shift + R` (ya Mac par `Cmd + Shift + R`) duba kar page refresh karein jisse naya cache load ho.
- **Agar `Publish` button grey hai:** Uska matlab koi zaroori field (jaise Title ya Slug) khali chhut gaya hai ya Slug ka `Generate` button nahi dabaya gaya hai. Red border wali field ko fill karein!
