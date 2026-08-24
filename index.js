const WebSocket=require('ws');
const wss=new WebSocket.Server({port:process.env.PORT||3000});
function cmd(ws,c){ws.send(JSON.stringify({header:{version:1,requestId:Date.now()+"",messageType:"commandRequest",messagePurpose:"commandRequest"},body:{commandLine:c,version:1}}))}
wss.on('connection',ws=>{
ws.send(JSON.stringify({header:{version:1,requestId:"0",messageType:"commandRequest",messagePurpose:"subscribe"},body:{eventName:"PlayerMessage"}}));
ws.on('message',d=>{
try{
let m=JSON.parse(d.toString());
let chat=(m.body?.properties?.Message||"").toLowerCase();
let p=m.body?.properties?.Sender||"@a";
if(!chat) return;
if(chat.includes("дай все")||chat.includes("дай всё")){
["netherite_sword","netherite_pickaxe","netherite_axe","netherite_shovel","netherite_helmet","netherite_chestplate","netherite_leggings","netherite_boots","diamond 64","netherite_ingot 32","totem_of_undying 20","enchanted_golden_apple 20","elytra","firework_rocket 64","beacon 5","shulker_box 10","ender_pearl 16","tnt 64","obsidian 64"].forEach(i=>cmd(ws,`give ${p} ${i}`));
cmd(ws,`tellraw ${p} {"rawtext":[{"text":"§aВСЕ ВЕЩИ ВЫДАНЫ!"}]}`);
}else if(chat.startsWith("дай ")){
let item=chat.replace("дай ","").trim().replace(/ /g,"_");
cmd(ws,`give ${p} ${item} 64`);
}
}catch(e){}
});
});
