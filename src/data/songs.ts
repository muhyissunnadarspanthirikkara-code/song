import { Artist, Song } from '../types';

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'mubashir',
    name: 'Mubashir Perinthattiri',
    malayalamName: 'മുബഷിർ പെരിന്തട്ടരി',
    img: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    description: 'ആത്മീയ ഗാനങ്ങളിലൂടെയും മദീന സ്നേഹ ഗീതങ്ങളിലൂടെയും ജനമനസ്സുകളിൽ ഇടംനേടിയ പ്രിയ ഗായകൻ.',
    songCount: 16
  },
  {
    id: 'madheena',
    name: 'Madheena Madeeh Specials',
    malayalamName: 'മദീന മദീഹ് ഗീതങ്ങൾ',
    img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80',
    description: 'പുണ്യ റസൂലിന്റെ (സ) സ്നേഹസുഗന്ധം പരത്തുന്ന ഹൃദയസ്പർശിയായ മദീഹ് ഗാനങ്ങൾ.',
    songCount: 5
  },
  {
    id: 'mappila',
    name: 'Classic Mappila & Qasida',
    malayalamName: 'ക്ലാസിക് മാപ്പിള & ഖസീദ',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    description: 'കേരളത്തിലെ പാരമ്പര്യ ഇശലുകളും ഖസീദത്തുൽ ബുർദയും ഇശൽ വിരുന്നും.',
    songCount: 4
  }
];

export const INITIAL_SONGS: Song[] = [
  // Mubashir Perinthattiri Songs (Original 16 tracks)
  {
    id: 'mp-1',
    title: 'Twaifinte Veedikal',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769771784287-ec008311-4cdd-419f-9545-4d2e8b86fc8d.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:15',
    lyrics: `ത്വാഇഫിന്റെ വീഥികളിൽ ചോരയൊഴുക്കിയ റസൂലേ...
കല്ലേറുകൾ സഹിച്ച പുണ്യ നബിയേ...
ദീനിന്റെ പാതയിൽ ത്യാഗങ്ങൾ തീർത്ത മുത്ത് ഹബീബേ...
സല്ലല്ലാഹു അലാ മുഹമ്മദ് സല്ലല്ലാഹു അലൈഹിവസല്ലം.`
  },
  {
    id: 'mp-2',
    title: 'Ya Muhammad Noore Mujassam',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769835553806-6c166887-bc5b-4a31-b26b-2eb5a5e87834.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '03:48',
    lyrics: `യാ മുഹമ്മദ് നൂറേ മുജസ്സം യാ റസൂലള്ളാഹ്...
അങ്ങേ തിരു തിരുമുഖം ഒന്ന് കാണുവാൻ ഖൽബിൽ കൊതിയാണേ...
ലോകത്തിൻ അനുഗ്രഹമായ് വന്നൊരു പുണ്യ ദൂതരേ...
അസ്സലാമു അലൈക്ക യാ സയ്യിദീ യാ റസൂലള്ളാഹ്.`
  },
  {
    id: 'mp-3',
    title: 'കാലം കനിഞ്ഞൊരു താരം',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769836517858-791af2ca-6277-428c-83d3-8b88191d0eb2.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:02',
    lyrics: `കാലം കനിഞ്ഞൊരു താരം ഉദിച്ചുയർന്നു മക്കാ മണ്ണിൽ...
അന്ധകാര ലോകത്തിന് വെളിച്ചമേകാൻ വന്നൊരു പൂർണ്ണ ചന്ദ്രൻ...
കാരുണ്യത്തിന്റെ സമുദ്രമേ അഹമ്മദ് റസൂലേ...
ഞങ്ങളുടെ സലാമുകൾ അങ്ങയിലേക്ക് എത്തണമേ.`
  },
  {
    id: 'mp-4',
    title: 'വാതിലിനോരം ചെന്നപ്പോൾ മുത്ത് നബി',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769836625572-04019cd2-a37a-483f-954a-73854ce87d22.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '03:55',
    lyrics: `വാതിലിനോരം ചെന്നപ്പോൾ മുത്ത് നബി ചിരിച്ചു...
ആ പൂമുഖം കണ്ട നേരം കണ്ണുകൾ നിറഞ്ഞൊഴുകി...
ആലം വാഴുന്ന നായകന്റെ സന്നിധിയിൽ നിൽക്കുമ്പോൾ
ഉള്ളിലെ ആഗ്രഹങ്ങൾ മുഴുവൻ സഫലമായി.`
  },
  {
    id: 'mp-5',
    title: 'പുണ്യ മദീന പള്ളിയിൽ മൂലയിൽ',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769836788248-f41a19ce-d98d-4506-a407-4405ce9790e2.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:30',
    lyrics: `പുണ്യ മദീന പള്ളിയിൽ മൂലയിൽ ഇരിക്കണം...
റൗള ശരീഫിലേക്ക് നോക്കി സലാം ചൊല്ലണം...
മനസ്സിലെ നൊമ്പരങ്ങൾ റസൂലോട് പറയണം...
ഒരു നോക്ക് എങ്കിലും തങ്ങൾ എന്നെ കാണണം.`
  },
  {
    id: 'mp-6',
    title: 'അല്ലാഹുവിന്റെ ദൂതരായ ത്വാഹ റസൂൽ',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769836887953-35818a32-44db-4e3b-81c3-cbd0aeee1797.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '03:40',
    lyrics: `അല്ലാഹുവിന്റെ ദൂതരായ ത്വാഹ റസൂൽ വന്നിതാ...
സ്വർഗ്ഗീയ പൂവായ റഹ്മത്തുൽ ലിൽ ആലമീൻ...
സത്യദീനിൻ ദീപം കൊളുത്തിയ പ്രവാചകരേ...
അങ്ങയുടെ പാത പിന്തുടരാൻ തൗഫീഖ് നൽകേണമേ.`
  },
  {
    id: 'mp-7',
    title: 'യാ ബദ്‌റൽ കമാലി',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769836982595-1e28d1e8-650e-46f4-bd93-9e71a6b7d564.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:10',
    lyrics: `യാ ബദ്‌റൽ കമാലി യാ നൂറൽ വുജൂദ്...
അന്ത ശംസുൻ അന്ത ബദ്‌റുൻ അന്ത നൂറുൻ ഫൗഖ നൂറിൻ...
പൂർണ്ണചന്ദ്രനേക്കാൾ തിളങ്ങുന്ന സൗന്ദര്യമേ...
മുത്ത് നബിയേ ഞങ്ങളുടെ രക്ഷകനേ.`
  },
  {
    id: 'mp-8',
    title: 'മദീനയുടെ നാമത്തിൽ',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769837056994-64c233d6-9fef-4c56-b218-78b1dee92b53.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '03:52',
    lyrics: `മദീനയുടെ നാമത്തിൽ ഖൽബ് തുടിക്കുന്നു...
പച്ച ഖുബ്ബ കണ്ടു കൊതി തീരാതെ നിൽക്കുന്നു...
മദീനയിലേക്ക് ഒരു യാത്രയെങ്കിലും വിധിക്കണേ റബ്ബേ...
മുത്ത് റസൂലിൻ ചാരത്ത് ചെന്ന് അണയാൻ കൊതിയാണേ.`
  },
  {
    id: 'mp-9',
    title: 'പെട്ടു പോയി ഹബീബെ എന്നെ വെറുക്കരുതേ',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769837216205-4610d242-15ee-43f4-9efc-8123ae73b61c.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:22',
    lyrics: `പെട്ടു പോയി ഹബീബെ എന്നെ വെറുക്കരുതേ...
പാപങ്ങൾ ചെയ്തൊരു പാപിയാണീ ദാസൻ...
ശഫാഅത്തിന്റെ നാളിൽ എന്നെയും ഓർക്കണേ...
കൈവിടരുതേ മുത്ത് റസൂലേ എന്നെ.`
  },
  {
    id: 'mp-10',
    title: 'ഞാൻ വന്നിരുന്നെന്റെ ഖൽബിന്റെ ചാരെ',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769837283923-537d7adb-20ae-4627-8943-f5687edd6724.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:05',
    lyrics: `ഞാൻ വന്നിരുന്നെന്റെ ഖൽബിന്റെ ചാരെ...
നിറഞ്ഞ കണ്ണീരോടെ മാപ്പിനായ് കേഴുന്നു...
മദീനയിലെ മണ്ണിൽ അലിഞ്ഞു ചേരാൻ കൊതിക്കുന്നു...
യാ റസൂലള്ളാഹ് റഹ്മത്തേകണേ.`
  },
  {
    id: 'mp-11',
    title: 'ഇപ്പൊ മുബശ്ശിർ ഉസ്താദ് ആണ് ട്രെൻഡ്',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769837451957-0bbc6006-eba5-4cdd-871b-ccf18063eeab.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '03:45',
    lyrics: `മനസ്സ് തുറന്ന് പാടുന്ന മാപ്പിള ഈണങ്ങൾ...
ഹൃദയങ്ങളിൽ സ്നേഹത്തിന്റെ തെന്നൽ പടർത്തുന്ന ഗാനങ്ങൾ...
മുബശ്ശിർ ഉസ്താദിന്റെ സ്വരമാധുരിയിൽ
ആത്മീയതയുടെ പുതിയൊരു വസന്തം.`
  },
  {
    id: 'mp-12',
    title: 'എന്താ ഫീലിംഗ്...',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769837654703-95cbacf9-1b5b-4e01-99f8-09e04602cf84.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '03:58',
    lyrics: `എന്താ ഫീലിംഗ് കേൾക്കുമ്പോൾ ഉള്ളിൽ നിറയുന്നത്...
മദീനയുടെ കുളിര് കാറ്റ് വന്നു തൊടുന്ന പോലെ...
നബിയോടുള്ള ഇശ്ഖിന്റെ തീരങ്ങളിൽ
മനം അറിയാതെ പാടിപ്പോകുന്ന പാട്ടുകൾ.`
  },
  {
    id: 'mp-13',
    title: 'മനസ്സിനെ സമാധാനത്തോടെ നിറക്കുന്ന',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769837753163-67db0be3-a850-4aed-b827-450e9514e9f9.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:18',
    lyrics: `മനസ്സിനെ സമാധാനത്തോടെ നിറക്കുന്ന ഈണങ്ങൾ...
ടെൻഷനുകൾ മാറി ശാന്തത നൽകുന്ന വരികൾ...
അല്ലാഹുവിൻ ദിക്റും റസൂലിൻ മദ്ഹും
ഹൃദയങ്ങൾക്ക് ജീവനേകുന്ന ഔഷധമാണ്.`
  },
  {
    id: 'mp-14',
    title: 'കരയിപ്പിച്ചു കളഞ്ഞല്ലൊ ഉസ്താദേ',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769837838273-f59b9e31-0057-4aa6-ab58-effef3b04fb8.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:12',
    lyrics: `കരയിപ്പിച്ചു കളഞ്ഞല്ലൊ ഉസ്താദേ വരികൾ കേട്ട്...
കണ്ണുനീർ തുള്ളികൾ സാക്ഷിയായ് നിൽക്കുന്നു...
ഖൽബിലെ പാപക്കറകൾ കഴുകി മാറ്റാൻ
ഇത്തരം മദ്ഹ് ഗാനങ്ങൾ എത്രയോ പ്രിയങ്കരം.`
  },
  {
    id: 'mp-15',
    title: 'ഈ പാട്ടിന്റെ ഓരോ വരികളും മനസ്സിൽ തറക്കും',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769837897570-c640abcb-56e6-498d-b7a1-9c5068fa356a.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:08',
    lyrics: `ഈ പാട്ടിന്റെ ഓരോ വരികളും മനസ്സിൽ തറക്കും...
ജീവിതത്തിന്റെ സത്യം ഓർമ്മിപ്പിക്കുന്ന വാക്കുകൾ...
മുത്ത് നബിയുടെ ചര്യകൾ ജീവിതത്തിൽ പകർത്താൻ
നമുക്കേവർക്കും മാതൃകയാകട്ടെ.`
  },
  {
    id: 'mp-16',
    title: 'മുബഷിർ ഉസ്താദിന്റെ എവർഗ്രീൻ ഫീലിംഗ് സോങ്',
    artist: 'Mubashir Perinthattiri',
    artistId: 'mubashir',
    url: 'https://image2url.com/r2/default/audio/1769837998848-64ffc18c-2de9-4b0c-9ede-67f5ee56fd55.mp3',
    coverImg: 'https://i.postimg.cc/ZKgJNNVz/download-(9).jpg',
    category: 'mubashir',
    duration: '04:45',
    lyrics: `എവർഗ്രീൻ ഫീലിംഗ് സോങ്... എപ്പോഴും ഖൽബിൽ മുഴങ്ങുന്ന ഗാനം...
റൗളയുടെ തണലിൽ ഒരിടം കിട്ടാൻ കൊതിക്കുന്ന
ഓരോ വിശ്വാസിയുടെയും അന്തരംഗ വികാരം
ഈ വരികളിൽ അലിഞ്ഞു ചേരുന്നു.`
  },

  // Additional New Songs (Madheena & Mappila Classics)
  {
    id: 'new-1',
    title: 'മദീനയിലെ തെന്നലേ (Madheenayile Thennale)',
    artist: 'Mubashir & Friends',
    artistId: 'madheena',
    url: 'https://image2url.com/r2/default/audio/1769771784287-ec008311-4cdd-419f-9545-4d2e8b86fc8d.mp3',
    coverImg: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80',
    category: 'madheena',
    duration: '04:15',
    lyrics: `മദീനയിലെ തെന്നലേ നീ പോരുമോ ഇവിടെ...
മുത്ത് നബിയുടെ പുണ്യ മണം പകർന്നു നൽകുമോ...
ഖൽബിൽ കൊതിയാണ് ആ മണ്ണ് തൊടാൻ
റൗളയുടെ ചാരത്ത് ചെന്ന് അണയാൻ.`
  },
  {
    id: 'new-2',
    title: 'ത്വലഅൽ ബദ്റു അലൈനാ (Talaal Badru Alayna)',
    artist: 'Traditional Qasida',
    artistId: 'mappila',
    url: 'https://image2url.com/r2/default/audio/1769835553806-6c166887-bc5b-4a31-b26b-2eb5a5e87834.mp3',
    coverImg: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    category: 'mappila',
    duration: '03:48',
    lyrics: `ത്വലഅൽ ബദ്റു അലൈനാ മിൻ സനിയ്യാതിൽ വിദാഇ
വജബഷ് ശുക്റു അലൈനാ മാ ദആ ലില്ലാഹി ദാഇ
അയ്യുഹൽ മബ്ഊസു ഫീനാ ജിഅ്ത ബിൽ അംരിൽ മുത്വാഇ
ജിഅ്ത ഷറഫ്തൽ മദീനാ മർഹബൻ യാ ഖൈറ ദാഇ.`
  },
  {
    id: 'new-3',
    title: 'അഴകേ മദീന പൂങ്കാവനം (Azhake Madheena)',
    artist: 'Mappila Devotional Choir',
    artistId: 'madheena',
    url: 'https://image2url.com/r2/default/audio/1769836517858-791af2ca-6277-428c-83d3-8b88191d0eb2.mp3',
    coverImg: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80',
    category: 'madheena',
    duration: '04:02',
    lyrics: `അഴകേ മദീന പൂങ്കാവനം... മലരുകൾ വിരിയുന്ന സ്നേഹതീരം...
മുത്ത് റസൂലുള്ളാഹി ശയിക്കുന്ന ധന്യത...
ആ പുണ്യ ഭൂവിൽ ഒരു ദിനമെങ്കിലും ജീവിക്കാൻ ഭാഗ്യമേകണേ റബ്ബേ.`
  },
  {
    id: 'new-4',
    title: 'ഖസീദത്തുൽ ബുർദ (Qasidathul Burda)',
    artist: 'Al Madeeh Ensemble',
    artistId: 'mappila',
    url: 'https://image2url.com/r2/default/audio/1769836887953-35818a32-44db-4e3b-81c3-cbd0aeee1797.mp3',
    coverImg: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    category: 'mappila',
    duration: '03:40',
    lyrics: `മൗലാ യ സ്വല്ലി വസല്ലിം ദാഇമൻ അബദൻ
അലാ ഹബീബിക ഖൈരിൽ ഖൽഖി കുല്ലിഹിമി...
മുഹമ്മദുൻ സയ്യിദുൽ കൗനൈനി വസ്സഖലൈനി
വൽ ഫരീഖൈനി മിൻ ഉർബിൻ വമിൻ അജമി.`
  },
  {
    id: 'new-5',
    title: 'ബദരീങ്ങളുടെ കാവൽ (Badriyyeen Baith)',
    artist: 'Duff & Baith Group',
    artistId: 'madheena',
    url: 'https://image2url.com/r2/default/audio/1769837056994-64c233d6-9fef-4c56-b218-78b1dee92b53.mp3',
    coverImg: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80',
    category: 'madheena',
    duration: '03:52',
    lyrics: `യാ അല്ലാഹ് യാ അല്ലാഹ്... ബദരീങ്ങളുടെ ബറക്കത്തിനാൽ കാക്കേണമേ...
മുസ്ലിമീങ്ങൾക്ക് രക്ഷയേകിയ പുണ്യ ബദർ ശുഹദാക്കളുടെ സ്മരണയിൽ
ഞങ്ങളുടെ ദുആകൾ നീ സ്വീകരിക്കേണമേ.`
  }
];
