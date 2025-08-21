exports.seed = async function(knex) {
  await knex('emoji').del()
  await knex('emoji').insert([
    {
      emoji: '😀', 
      title: 'Grinning Face',
      description: 'A yellow face with simple, open eyes and a broad, open smile, showing upper teeth and tongue on some platforms. Often conveys general pleasure and good cheer or humor.'
    },
    {
      emoji: '🤣', 
      title: 'Rolling on the Floor Laughing',
      description: 'A yellow face with a big grin and scrunched, X-shaped eyes, tilted on its side as if rolling on the floor laughing (the internet acronym ROFL). Sheds two tears and tilts right on most platforms. Often conveys hysterical laughter more intense than 😂 Face With Tears of Joy.',
    },
    {
      emoji: '😇', 
      title: 'Smiling Face with Halo',
      description: 'A face with smiling eyes, closed smile, and halo, usually blue, overhead. Often represents angels, prayers, and blessings. May also convey angelic behavior, e.g., doing good deeds. See also 👼 Baby Angel.',
    },
    {
      emoji: '🥲',
      title: 'Smiling Face with Tear',
      description: 'A yellow face with open eyes, a thin closed-mouth smile, and a single tear falling from one of its eyes. Can be used to express a wide range of emotions and expressions including gratitude, tender happiness, an attempt to look happy when actually sad, or smiling through pain. Can also be a response to something that is bittersweet.',
    }
  ]);
};
