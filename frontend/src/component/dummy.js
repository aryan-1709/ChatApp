
  // const initialMessages = [
  //   {
  //     message: "Good question. How about just discussing it?",
  //     time: "Today 11:55",
  //     images: [
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/8c750bc198e6ede79ba73fa7df216a7d5e1bc2ed21619d47f0f6e85f2f64bd00?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/aafe58e66b22be27b22d8a7540b1f1d4935936f5e50d4100ba01e389aae0caf4?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&",
  //     ],
  //     messageType: "received",
  //   },
  //   {
  //     message: "Yes of course, Are there problems with your job?",
  //     time: "Today 11:53",
  //     messageType: "received",
  //   },
  //   {
  //     message: "Good question. How about just discussing it?",
  //     time: "Today 11:55",
  //     images: [
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/ac6cf5b632f269aa60b3adbdb2fc1b597e3f19a637403f02f5beab4e95c64f44?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/ac6cf5b632f269aa60b3adbdb2fc1b597e3f19a637403f02f5beab4e95c64f44?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&",
  //     ],
  //     messageType: "received",
  //   },
  //   {
  //     message: "Yes of course, Are there problems with your job?",
  //     time: "Today 11:53",
  //     messageType: "received",
  //   },
  //   {
  //     message: "Of course. Thank you so much for taking your time.",
  //     time: "Today 11:56",
  //     messageType: "sent",
  //   },
  //   {
  //     message: "Morning Eten Hunt, I have a question about my job!",
  //     time: "Today 11:52",
  //     messageType: "sent",
  //   },
  //   {
  //     message:
  //       "What are the points that are important to get the perfect result of my assignment?",
  //     time: "Today 11:54",
  //     messageType: "sent",
  //   },
  // ]








  // import React from 'react';

// function MessageSection({ message }) {
//   return (
//     <section className="flex flex-col self-stretch py-2.5 pr-20 pl-5 w-full rounded-xl bg-slate-50">
//       <div className="flex gap-5 justify-between">
//         <div className="flex-auto text-sm font-medium tracking-tight leading-5 text-slate-950">{message.name}</div>
//         <div className="text-xs tracking-normal text-right text-zinc-500 text-opacity-80">{message.role}</div>
//       </div>
//       <div className="mt-2 text-xs font-medium tracking-tight text-zinc-500 text-opacity-80">{message.content}</div>
//     </section>
//   );
// }

// function NotificationItem({ notification }) {
//   return (
//     <section className="flex flex-col px-5 py-2.5 w-full bg-white max-w-[292px]">
//       <div className="flex gap-5 justify-between">
//         <div className="flex-auto text-sm font-semibold tracking-tight leading-5 text-slate-950">{notification.name}</div>
//         <div className="text-xs tracking-normal text-right text-zinc-500 text-opacity-80">{notification.time}</div>
//       </div>
//       <div className="flex gap-5 justify-between mt-2 text-xs font-medium tracking-tight text-zinc-500 text-opacity-80">
//         <div className="flex-auto">{notification.message}</div>
//         <img loading="lazy" alt={notification.alt} src={notification.imageSrc} className="shrink-0 aspect-square w-[18px]" />
//       </div>
//     </section>
//   );
// }

// function MessagingApp() {
//   const messages = [
//     { name: 'Eten Hunt', role: 'Agents', content: 'Thank you very much. I’m glad ...' },
//     // Other message objects
//   ];

//   const notifications = [
//     { name: 'Jeremy Zucker', time: '4 m Ago', message: 'You : Sure! let me teach you about ...', imageSrc: 'https://cdn.builder.io/api/v1/image/assets%2F...', alt: 'Profile' },
//     // Other notification objects
//   ];

//   return (
//     <main className="flex flex-col justify-end items-center px-5 pt-6 mx-auto w-full bg-white max-w-[480px]">
//       <header className="flex gap-5 justify-between self-stretch w-full whitespace-nowrap">
//         <div className="flex gap-1 px-1">
//           <div className="grow text-2xl font-semibold tracking-tighter leading-9 text-slate-950">Messaging</div>
//           <div className="justify-center self-start px-1 py-1 text-xs text-center text-red-800 bg-red-500 rounded">137</div>
//         </div>
//         <div className="flex gap-1.5 py-1 pr-1 pl-2.5 my-auto text-sm font-medium leading-6 border border-solid border-slate-50 text-slate-950">
//           <div className="grow">Agents</div>
//           <img loading="lazy" alt="Agents" src="https://cdn.builder.io/api/v1/image/assets%2F..." className="shrink-0 w-6 aspect-square" />
//         </div>
//       </header>
//       <section className="flex gap-4 self-stretch px-4 py-3.5 mt-3 text-sm bg-slate-50 text-neutral-400">
//         <img loading="lazy" alt="Search" src="https://cdn.builder.io/api/v1/image/assets%2F..." className="shrink-0 aspect-[0.9] w-[18px]" />
//         <div className="flex-auto">Search in dashboard...</div>
//       </section>
//       {messages.map((message, index) => (
//         <MessageSection key={index} message={message} />
//       ))}
//       {notifications.map((notification, index) => (
//         <NotificationItem key={index} notification={notification} />
//       ))}
//     </main>
//   );
// }

// export default MessagingApp;








// Schema.findOneAndUpdate(
//   { name: dataReceived.name }, // Find the document with the given name
//   {
//     $set: { "message.0.id":dataReceived.id
//     },
//     $push: { "message.0.msgs": {  // Push a new message object to the "msgs" array inside the first message object
//       message: dataReceived.message,
//       messageType: dataReceived.messageType,
//       time: dataReceived.time,
//     }}
//   },
//   { new: true, upsert: true } // Options: return the updated document and create if it doesn't exist
// )