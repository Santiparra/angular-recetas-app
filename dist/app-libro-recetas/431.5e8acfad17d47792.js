"use strict";(self.webpackChunkapp_libro_recetas=self.webpackChunkapp_libro_recetas||[]).push([[431],{7431:(I,g,c)=>{c.r(g),c.d(g,{ShoppingListModule:()=>y});var d=c(433),h=c(3841),p=c(2997),f=c(4466),s=c(3584),t=c(4650),u=c(6895);class l{constructor(i,e){this.name=i,this.amount=e}}const b=["form"];function S(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",13),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.onDelete())}),t._uU(1," Borrar "),t.qZA()}}let _=(()=>{class n{constructor(e){this.store=e,this.editMode=!1}ngOnInit(){this.editionSubscription=this.store.select("shoppingList").subscribe(e=>{const o=e.editIndex;o>-1?(this.editMode=!0,this.editedItem=e.ingredients[o],this.slForm.setValue({name:this.editedItem.name,amount:this.editedItem.amount})):this.editMode=!1})}ngOnDestroy(){this.editionSubscription.unsubscribe(),this.store.dispatch(s.VP())}onSubmit(e){const o=e.value,r=new l(o.name,o.amount);this.store.dispatch(this.editMode?s.kA({ingredient:r}):s.ME({ingredient:r})),e.reset(),this.editMode=!1}onReset(){this.slForm.reset(),this.editMode=!1,this.store.dispatch(s.VP())}onDelete(){this.store.dispatch(s.tR()),this.onReset()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.yh))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-shopping-edit"]],viewQuery:function(e,o){if(1&e&&t.Gf(b,5),2&e){let r;t.iGM(r=t.CRH())&&(o.slForm=r.first)}},decls:20,vars:3,consts:[[1,"row"],[1,"col-xs-12"],[3,"ngSubmit"],["form","ngForm"],[1,"col-sm-5","form-group"],["for","name"],["type","text","id","name","ngModel","","name","name","required","",1,"form-control"],[1,"col-sm-2","form-group"],["for","amount"],["type","number","id","amount","ngModel","","name","amount","required","","pattern","^[1-9]+[0-9]*$",1,"form-control"],["type","submit",1,"btn","btn-success",3,"disabled"],["class","btn btn-danger","type","button",3,"click",4,"ngIf"],["type","button",1,"btn","btn-primary",3,"click"],["type","button",1,"btn","btn-danger",3,"click"]],template:function(e,o){if(1&e){const r=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"form",2,3),t.NdJ("ngSubmit",function(){t.CHM(r);const m=t.MAs(3);return t.KtG(o.onSubmit(m))}),t.TgZ(4,"div",0)(5,"div",4)(6,"label",5),t._uU(7,"Nombre"),t.qZA(),t._UZ(8,"input",6),t.qZA(),t.TgZ(9,"div",7)(10,"label",8),t._uU(11,"Cantidad"),t.qZA(),t._UZ(12,"input",9),t.qZA()(),t.TgZ(13,"div",0)(14,"div",1)(15,"button",10),t._uU(16),t.qZA(),t.YNc(17,S,2,0,"button",11),t.TgZ(18,"button",12),t.NdJ("click",function(){return o.onReset()}),t._uU(19," Reiniciar "),t.qZA()()()()()()}if(2&e){const r=t.MAs(3);t.xp6(15),t.Q6J("disabled",!r.valid),t.xp6(1),t.hij(" ",o.editMode?"Editar":"Agregar"," "),t.xp6(1),t.Q6J("ngIf",o.editMode)}},dependencies:[u.O5,d._Y,d.Fj,d.wV,d.JJ,d.JL,d.Q7,d.c5,d.On,d.F]}),n})();function C(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"a",4),t.NdJ("click",function(){const a=t.CHM(e).index,m=t.oxw();return t.KtG(m.onEditItem(a))}),t._uU(1),t.qZA()}if(2&n){const e=i.$implicit;t.xp6(1),t.AsE(" ",e.name," (",e.amount,") ")}}let v=(()=>{class n{constructor(e){this.store=e}ngOnInit(){this.ingredients=this.store.select("shoppingList")}ngOnDestroy(){}onEditItem(e){this.store.dispatch(s.H({index:e}))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.yh))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-shopping-list"]],features:[t._Bn([])],decls:7,vars:3,consts:[[1,"row"],[1,"col-xs-10"],[1,"list-group"],["class","list-group-item","style","cursor: pointer",3,"click",4,"ngFor","ngForOf"],[1,"list-group-item",2,"cursor","pointer",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"app-shopping-edit")(3,"hr"),t.TgZ(4,"ul",2),t.YNc(5,C,2,2,"a",3),t.ALo(6,"async"),t.qZA()()()),2&e&&(t.xp6(5),t.Q6J("ngForOf",t.lcZ(6,1,o.ingredients).ingredients))},dependencies:[u.sg,_,u.Ov]}),n})();const x={ingredients:[new l("Carne Picada",1),new l("Queso",500)],editIndex:-1},M=(0,p.Lq)(x,(0,p.on)(s.ME,(n,i)=>({...n,ingredients:n.ingredients.concat(i.ingredient)})),(0,p.on)(s.W2,(n,i)=>({...n,ingredients:n.ingredients.concat(...i.ingredients)})),(0,p.on)(s.kA,(n,i)=>({...n,editIndex:-1,ingredients:n.ingredients.map((e,o)=>o===n.editIndex?{...i.ingredient}:e)})),(0,p.on)(s.tR,n=>({...n,editIndex:-1,ingredients:n.ingredients.filter((i,e)=>e!==n.editIndex)})),(0,p.on)(s.H,(n,i)=>({...n,editIndex:i.index})),(0,p.on)(s.VP,n=>({...n,editIndex:-1})));function Z(n,i){return M(n,i)}let y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[f.m,d.u5,h.Bz.forChild([{path:"",component:v}]),p.Aw.forFeature("shoppingList",Z)]}),n})()}}]);