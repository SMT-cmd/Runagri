export const site = {
 name:'RunAgri Nigeria Limited',
 domain:'https://runagri.com',
 email:'frontdesk@runagri.com',
 registrationNumber:'9848130',
 description:'RunAgri Nigeria Limited facilitates agricultural commodity sourcing and trade between international suppliers and manufacturers across Nigeria and African markets.'
} as const;
export const nav=[
 {title:'Home',href:'/'},{title:'About us',href:'/about'},{title:'Commodities',href:'/commodities'},
 {title:'For buyers',href:'/buyers'},{title:'For suppliers',href:'/suppliers'},{title:'Our process',href:'/process'}
] as const;
export type Commodity={slug:string;name:string;label:string;image:string;short:string;intro:string;uses:string;requirements:string[]};
export const commodities:Commodity[]=[
 {slug:'wheat',name:'Wheat',label:'GRAINS / 01',image:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1300&q=85',short:'For flour milling, food manufacturing and selected industrial applications.',intro:'Wheat enquiries are assessed around buyer-defined grain characteristics, required grade, target quantity and agreed commercial terms.',uses:'Flour milling, food manufacturing and other industrial processing',requirements:['Product grade and protein requirements','Moisture, quality and supporting documentation','Target quantity, origin and delivery point']},
 {slug:'sorghum',name:'Sorghum',label:'GRAINS / 02',image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Field_in_Wynne%2C_Arkansas_2.jpg/1280px-Field_in_Wynne%2C_Arkansas_2.jpg',short:'For food processing, brewing, animal feed and other industrial uses.',intro:'Sorghum opportunities depend on the intended application, product characteristics and documented supplier capability.',uses:'Food processing, brewing, feed and relevant industrial applications',requirements:['Variety or colour specifications when relevant','Required cleanliness, moisture and quality','Volume, location, timing and commercial expectations']},
 {slug:'barley',name:'Barley',label:'GRAINS / 03',image:'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1300&q=85',short:'For malting, brewing, animal feed and suitable processing uses.',intro:'Barley is considered in the context of the buyer’s industrial purpose, specification and the supplier’s ability to deliver suitable product.',uses:'Malting, brewing, animal feed and processing',requirements:['Intended application and required grade','Product quality, origins and documents','Quantity, shipment window and agreed terms']},
 {slug:'african-cocoa',name:'African Cocoa',label:'COCOA / 04',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/20151118-OSEC-UNK-2935_(23904959686).jpg/1280px-20151118-OSEC-UNK-2935_(23904959686).jpg',short:'African-origin cocoa beans for processors, confectionery and related industries.',intro:'African cocoa sourcing enquiries are assessed around bean origin, grade, fermentation and drying standards, quality documentation and agreed commercial terms.',uses:'Cocoa processing, chocolate and confectionery manufacturing, cocoa butter and powder production',requirements:['Origin, intended use, harvest season and bean grade','Fermentation, moisture, cleanliness and defect specifications','Available quantity, packaging, quality records and shipment terms']}
];
export const heroImage='https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=2200&q=88';
export const fieldsImage='https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1700&q=82';
export const cargoImage='https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1700&q=82';
export const faqItems:[string,string][]=[
 ['What does RunAgri do?','RunAgri is focused on agricultural commodity sourcing, introductions, brokerage and trade coordination between suppliers and industrial buyers, subject to the scope of each opportunity.'],
 ['Which commodities are a priority?','Our priority commodities are wheat, sorghum, barley and African cocoa. Other agricultural raw materials may be evaluated when commercially relevant.'],
 ['Does RunAgri publish stock and prices?','No firm stock quantities or prices are published. Availability, specifications, pricing, delivery and all transaction terms must be confirmed case by case.'],
 ['Can I send a buying requirement?','Yes. Provide the commodity, intended use, grade or specification, target quantity, destination, desired timeline and any relevant commercial terms.'],
 ['Can a producer or exporter introduce supply?','Yes. Producers, aggregators and exporters may submit an introduction describing products, origin, documentation, volumes and delivery capability.'],
 ['Are suppliers automatically verified?','No. Counterparty and document review may form part of the process, but an initial introduction is not a guarantee of verification or performance.'],
 ['Does an enquiry create a contract?','No. Submitting an enquiry begins a potential conversation; any trade commitments require subsequent agreement between the appropriate parties.'],
 ['How can I contact RunAgri?','Email frontdesk@runagri.com or use the business enquiry form on our contact page.']
];
export const tradeSteps=[
 {n:'01',name:'Define the requirement',description:'Clarify product, grade, quantity, destination, timing and delivery expectations.'},
 {n:'02',name:'Assess the opportunity',description:'Review available company details, product information and potential supply capability.'},
 {n:'03',name:'Discuss the terms',description:'Coordinate discussions on specifications, price, documentation, payment and logistics.'},
 {n:'04',name:'Progress the transaction',description:'Support agreed next steps under the roles, responsibilities and contracts established by the parties.'}
];