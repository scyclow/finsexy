
const messages = [
  () => `
    <p>Greetings, my precious mate!</p>
    <p>I feel that you are probably sad regarding not receiving emails from me. However really the only cause for this is the fact that for many days I haven�t gotten emails from you! I continued crafting back to you without a reply and so i still do it now. The very first time I saw your message, I thought that our bond will proceed and perhaps It could possibly expand into some thing even more. But now when I'm not finding anything at all from your side - I'm unhappy. Perhaps you've many other activities to complete and you don't have spare time for me. At the same time, I even now desire to find a message from you. I'm actually good and continue to work at my job. However as of late, I've been thinking quite a lot regarding you. I'll be delighted to continue our relationship. I must understand you considerably better. I really hope now you�re able to send me some thing. Please let me know exactly what you had been busy with these days. I'll wait for your message with patience.</p>
    <p>Your friend Cagla.</p>
  `,

  user => `
    <p>Hello my friend ${user.name}!</p>
    <p>I was looking forward to your letter. Thank you for not ignoring my story. I really It's nice to know you closer. How is your day today? What do you do? How is your weather? I think that everything It's fine and your day is saturated. I think that now in your head there are many questions. And one of the questions where I received your e-mail. Now I would like to tell you about this. Recently I received a love Internet newsletter, from an unknown addressee. In this letter, it was talked about love relationships between people. In the list of e-mail recipients, I saw your address. I thought for a long time before I wrote you. I really have nothing to do with spam, just my heart Has prompted to write to you, and now I do not regret about it. My friend ${user.name}, I think that it will be interesting for you to also learn about what I like to do in my free Time, than I'm fond of in life. My hobbies are mainly aimed at studying culture, architecture and folk life. I like Painting, theater and everything related to art. I like to listen to classical music. You know, when I was I read a lot of historical books about my country. I always liked to learn about cultural values Countries of Europe and Asia, as well as all countries in the world. I believe that we need to know the history that surrounds our world. The most The main thing is that we live in peacetime. In each country, cultural rules are respected and Turkey does not an exception. I want you to learn my other hobbies. I really like to go in for sports. I believe that movement is life! I like running around in the morning. I try to attend the gym, because every girl should maintain a good figure. In the summer, I like to ride a bike, swim, play volleyball and sunbathe in the sun. In summer, I am very I love to meet the dawn and see off the sunset, on the river bank. Maybe in the future we will be able to meet the dawn Together, my dear friend ${user.name}? In the winter, I skate. The winter in my country is not so cold and there is almost no snow. But in my city there is a closed skating rink where it is possible to skate all year round. I always dreamed of skiing down mountains, but it's just my dream, Which is possible in the future will become a reality! I like to read books. Especially I like novels and love detectives. I like listening to music. I have never traveled outside of my country, so one of the most cherished desires in life is a journey. I would like to see the culture and people from another country. I'm very interested to know you. I think that We will definitely find a common language. All friends tell me that I'm a cheerful girl. I really lead an active lifestyle. I like Communicate and learn new people. Now, unfortunately, I do not have much time to To communicate with friends, because I have a lot of work. I am very calm, romantic and intelligent girl. In the shower, I Sensual and tender. Sometimes, I like to walk alone, in a city park. I look at people's faces, I see A lot of emotions. Someone enjoys life, someone has a broken life and no chance to go back. But people Continue to live. It hurts me to look at sad faces. If I had the opportunity, I would give Every person has happiness and a smile. I always wanted to have a ${user.gender} next to me who can truly love me. I'm looking for true love. You're looking for love too, ${user.name}? I think that we are much alike. In relationships, I value trust, understanding and, of course, love for each other. I want a person with whom I I will always, understood me, never offended and loved. I want only a serious relationship. I do not want any games. I think that you are looking for a serious relationship too, ${user.name}? I'm looking forward to your new letter to me.</p>
    <p>Your friend, Cagla.</p>
  `,

  user => `
    <p>Hello my friend ${user.name}!</p>
    <p>Thank you for opening yourself to me. It is very important that there is a thread of trust between us. I am very glad to receive your new letter. How is your day? What are you doing today? I hope you are OK. Today, I want to tell you more about the work I do. But first, I wanted you to find out how I get to work. My work is about 50 minutes from home. I have to get up at about 6:00 so as not to be late. I go to the shower, cook breakfast and get ready. I have to get to work in public transport. My working day starts at 8:00 hours and lasts until 18:00. I really like the work that I do. I work in a beautiful team. As you already know, I work as an accountant in a firm selling household appliances. Our company opened recently, but now it is confidently entering the sales market. Our team is 25 employees. Quite a bit, but all the friendly guys. I'm very glad that I was able to get into this organization. The essence of my work is to calculate the profits and losses of the organization, compiling a financial report for certain periods of time. My work is very important. I think that it is always difficult to work with the organization's finances, since there is a great responsibility. Maybe in the future, I can get a promotion, but since our organization is completely new, it's too early to think about it. Usually, after work I attend a gym or swimming pool. I really like to go in for sports. I'm trying to keep my figure in good shape. I believe that every girl should look after her appearance. My friend, in my childhood I attended a volleyball section. Our team took the leading position in the city. But I did not get a big finger injury, so I had to finish my career as a volleyball player. But even now, I love playing with the ball in the summer, on the beach. In the summer, I really like to swim in the lake. I remember how Dad taught me to swim. It's so cool. My friend, can you swim? Do you like swimming? Do you like to play sports? What sport do you like more? Please do not be shy and tell me everything about you. I want to get to know you better and develop our relationship. I feel that we are very similar. Please, tell me more about your work. What do you do? Do you like the work that you do? Unfortunately, my time at the Internet cafe is over. I have to go. I'm looking forward to your new letter to me.</p>
    <p>Your friend, Cagla.</p>
  `

]




const CaglaMessages = messages.reduce(
  (messageMap, msgFn, ix) => {
    return {
      ...messageMap,
      [`msg${ix}`]: {
        messageText: () => msgFn(getUserData()),
        responseHandler: () => `msg${ix+1}`
      }

    }
  },
  {
    START: {
      responseHandler: (userResponse) => `msg0`
    }
  }
)



const CaglaChat = new MessageHandler('cagla', CaglaMessages, 'START')

const caglaChatWindow = $.id('cagla-chat')

CaglaChat.addChatWindow(caglaChatWindow)



