export interface ScholarQuestion {
    id: string;
    question: string;
    answer: string;
}

export interface Scholar {
    id: string;
    name: string;
    title: string;
    specialization: string;
    status: "online" | "away" | "offline";
    bio: string;
    avatarBg: string;
    avatarText: string;
    questions: ScholarQuestion[];
}

export const SCHOLARS: Scholar[] = [
    {
        id: "ahmad-al-sayed",
        name: "Ahmad Al-Sayed",
        title: "Sheikh",
        specialization: "Fiqh & Daily Life Jurisprudence",
        status: "online",
        bio: "PhD in Islamic Law with 15+ years of experience helping Muslims navigate contemporary legal and ethical issues.",
        avatarBg: "bg-emerald-500",
        avatarText: "AS",
        questions: [
            {
                id: "q1",
                question: "How do I maintain concentration (Khushu) in my prayers?",
                answer: "Assalamu Alaikum. Maintaining concentration (Khushu) requires conscious effort. First, slow down your physical movements (Tuma'ninah) in bowing and prostrating. Second, take 2 minutes before starting to realize you are standing directly in front of the Lord of the worlds. Third, try to learn the meanings of the Surahs you recite so your mind is engaged."
            },
            {
                id: "q2",
                question: "What are the travel prayer parameters for shortening/combining?",
                answer: "Assalamu Alaikum wa Rahmatullah. The traveler is permitted to shorten (Qasr) the 4-rak'ah prayers to 2, and to combine (Jam') Dhuhr with Asr, and Maghrib with Isha. This applies if your travel distance exceeds approximately 80 kilometers, starting from the moment you leave your city limits. This concession is a beautiful gift of ease from Allah."
            },
            {
                id: "q3",
                question: "How can I balance my studies with my daily prayers?",
                answer: "Assalamu Alaikum. Prioritize your time by building your study schedule around your prayers, not the other way around. If you set your intention to gain skills that will benefit the community for the sake of Allah, your academic study hours will also be counted as a form of worship."
            }
        ]
    },
    {
        id: "yasmin-mujahid",
        name: "Yasmin Mogahed",
        title: "Ustadha",
        specialization: "Spiritual Well-being & Mental Health",
        status: "online",
        bio: "Acclaimed author and specialist in spiritual psychology, focused on rebuilding attachment to Allah and healing the heart.",
        avatarBg: "bg-rose-500",
        avatarText: "YM",
        questions: [
            {
                id: "q1",
                question: "How do I deal with spiritual burnout and low Iman?",
                answer: "Assalamu Alaikum. This is Yasmin. The state of our Iman naturally fluctuates. Do not mistake a season of weakness for a permanent state of failure. The key is never to stop seeking Allah's door. Keep up your obligatory acts, even if they feel heavy, and ask Allah: 'O Turner of hearts, keep my heart steadfast on Your religion.'"
            },
            {
                id: "q2",
                question: "What supplications (Duas) help relieve sudden anxiety?",
                answer: "Assalamu Alaikum. When anxiety strikes, ground yourself in the present. Recite: 'Hasbunallahu wa ni'mal wakeel' (Sufficient is Allah for us, and He is the best Disposer of affairs). Trust that whatever is meant to reach you will never miss you, and whatever is meant to miss you will never reach you."
            },
            {
                id: "q3",
                question: "How do we cultivate peace and mercy in a marriage?",
                answer: "Assalamu Alaikum. A peaceful home is built on mutual appreciation, forgiveness, and looking past minor flaws. Set aside time daily to talk without screens, pray together at least once a day, and express gratitude for each other's efforts."
            }
        ]
    },
    {
        id: "hamza-yusuf",
        name: "Hamza Yusuf",
        title: "Sheikh",
        specialization: "Theology, Creed & Contemporary Ethics",
        status: "away",
        bio: "Co-founder of Zaytuna College, leading scholar on Islamic theology, education, and modern civilizational challenges.",
        avatarBg: "bg-blue-500",
        avatarText: "HY",
        questions: [
            {
                id: "q1",
                question: "How do I purify my heart from pride and envy?",
                answer: "Assalamu Alaikum. A sound heart (Qalb Saleem) is free from spiritual diseases like pride and envy. The cure lies in doing the opposite of what your lower self (nafs) desires. If you feel pride, practice serving others. If you feel envy, pray for the expansion of blessings for the person you envy."
            },
            {
                id: "q2",
                question: "How do I build reliance (Tawakkul) when facing uncertainty?",
                answer: "Assalamu Alaikum. Reliance (Tawakkul) is realizing that the future is in the hands of the Creator. Do your utmost in planning and action today, and then hand over the outcomes to the One who controls the universe. Anxiety arises when we try to control what we cannot."
            },
            {
                id: "q3",
                question: "What is the best way to develop intellectual discipline?",
                answer: "Assalamu Alaikum. Intellectual discipline begins with protecting your attention span. Limit screen time and digital scrolling. Dedicate time daily to reading classical texts and contemplating nature. Cultivate silent contemplation to allow your thoughts to mature."
            }
        ]
    },
    {
        id: "maryam-amir",
        name: "Maryam Amir",
        title: "Ustadha",
        specialization: "Women's Matters & Youth Guidance",
        status: "online",
        bio: "Master's in Islamic Studies. Passionate about empowering women and youth through faith, compassion, and structured knowledge.",
        avatarBg: "bg-purple-500",
        avatarText: "MA",
        questions: [
            {
                id: "q1",
                question: "How does Islam honor and empower women spiritually?",
                answer: "Assalamu Alaikum Sis! Islam honors women as equal spiritual partners to men. In the Quran, Allah says: 'Whoever does righteous deeds, whether male or female, while being a believer - those will enter Paradise.' (40:40). True empowerment in Islam means realizing that your value is defined by your relationship with your Creator, not by societal expectations. You are deeply valued, honored, and hold an essential role in the family and the wider Ummah."
            },
            {
                id: "q2",
                question: "How do I handle peer pressure and stay firm on my values?",
                answer: "Assalamu Alaikum. Resisting peer pressure requires standing firm in your identity. Seek out companions who support your faith, even if they are few. The Prophet (peace be upon him) taught us that our close companions heavily shape our character."
            },
            {
                id: "q3",
                question: "How do I overcome low self-worth and connect with Allah?",
                answer: "Assalamu Alaikum. Remember that your self-worth is defined by your relationship with your Creator, not societal standards. Allah created you with inherent dignity. Speak to Him in your prostrations (Sujud) with absolute sincerity in your own words, and let His love heal you."
            }
        ]
    },
    {
        id: "omar-suleiman",
        name: "Omar Suleiman",
        title: "Sheikh",
        specialization: "Spiritual Character, Ethics & Compassion",
        status: "online",
        bio: "Founder and President of the Yaqeen Institute for Islamic Research, renowned for guidance on character, ethics, and contemporary activism.",
        avatarBg: "bg-teal-600",
        avatarText: "OS",
        questions: [
            {
                id: "q1",
                question: "How do I cultivate sincere gratitude (Shukr) in daily life?",
                answer: "Assalamu Alaikum. Sincere gratitude is reflecting on minor blessings we take for granted (e.g., breath, sight, safety). To build it, try writing down three distinct things you are grateful for each night, thanking Allah explicitly, and utilizing those blessings in ways that please Him."
            },
            {
                id: "q2",
                question: "How can I maintain patience and trust in Allah during personal loss?",
                answer: "Assalamu Alaikum. Realize that loss is a temporary separation, not a final end. The Prophet (peace be upon him) wept when he lost his son Ibrahim, demonstrating that grief is natural. Patience (Sabr) is choosing to say 'Inna lillahi wa inna ilayhi raji'un' and trusting that Allah will build something better for you in Jannah."
            },
            {
                id: "q3",
                question: "What does Islam teach about social justice and helping the community?",
                answer: "Assalamu Alaikum. Helping others is a fundamental pillar of our faith. The Prophet (peace be upon him) taught us: 'The most beloved of people to Allah are those who are most beneficial to people.' Standing up for justice and alleviating another's distress are direct pathways to attaining Allah's mercy."
            }
        ]
    },
    {
        id: "shadi-al-masri",
        name: "Shadi Al-Masri",
        title: "Dr.",
        specialization: "Islamic History & Classical Sciences",
        status: "away",
        bio: "Professor of Islamic History, specializing in connecting classical wisdom with modern challenges and preserving our intellectual heritage.",
        avatarBg: "bg-amber-600",
        avatarText: "SM",
        questions: [
            {
                id: "q1",
                question: "What lessons can we learn from the Prophet's Seerah about overcoming adversity?",
                answer: "Assalamu Alaikum. The Seerah is a masterclass in resilience. The Prophet (peace be upon him) faced isolation, bereavement, and persecution, yet remained gentle, steady, and optimistic. The core lesson is that hardship is a catalyst for spiritual purification and that victory comes with perseverance."
            },
            {
                id: "q2",
                question: "How did early Muslim scholars balance scientific inquiry with religious devotion?",
                answer: "Assalamu Alaikum. For classical Muslim scholars, studying the physical world was a direct extension of their worship. They saw the cosmos as signs (Ayat) of the Creator. There was no conflict because both scripture and nature point to the same absolute Truth."
            },
            {
                id: "q3",
                question: "How can I study classical Islamic books as a beginner?",
                answer: "Assalamu Alaikum. Start with simple commentaries on foundational texts, like Imam al-Nawawi's Forty Hadith or introductory books on Aqeedah and Fiqh. Avoid jumping into complex books without a teacher. Find structured circles or reliable online courses that walk through texts sequentially."
            }
        ]
    },
    {
        id: "bilal-philips",
        name: "Bilal Philips",
        title: "Dr.",
        specialization: "Islamic Studies & Modern Creed",
        status: "online",
        bio: "Chancellor of the International Open University, specialist in Islamic theology, education, and simplifying foundational creed for global audiences.",
        avatarBg: "bg-indigo-600",
        avatarText: "BP",
        questions: [
            {
                id: "q1",
                question: "What is the true meaning of worship (Ibadah) in Islam?",
                answer: "Assalamu Alaikum. Worship (Ibadah) is not limited to ritual acts. It encompasses everything that Allah loves and is pleased with—both inward and outward actions, including speaking the truth, being honest in business, helping the poor, and displaying good manners."
            },
            {
                id: "q2",
                question: "How can I protect my faith in a highly secular world?",
                answer: "Assalamu Alaikum. Protecting your faith (Iman) requires daily study of the Quran and authentic Hadith, keeping the company of practicing Muslims, and avoiding environments that consistently encourage unethical behavior or feed spiritual doubt."
            },
            {
                id: "q3",
                question: "What are the core pillars of a healthy Islamic lifestyle?",
                answer: "Assalamu Alaikum. A healthy Islamic lifestyle balances spiritual disciplines (regular prayers and Quran reading), physical health (wholesome, halal nutrition and exercise), and mental well-being (seeking knowledge, sleeping early, and avoiding excessive digital distractions)."
            }
        ]
    },
    {
        id: "taimiyyah-zubair",
        name: "Taimiyyah Zubair",
        title: "Ustadha",
        specialization: "Quran Translation & Tafseer",
        status: "online",
        bio: "Renowned Quran teacher and scholar, specializing in word-for-word translation, grammatical analysis, and thematic Tafseer.",
        avatarBg: "bg-pink-600",
        avatarText: "TZ",
        questions: [
            {
                id: "q1",
                question: "What is the best way to start understanding the Tafseer of the Quran?",
                answer: "Assalamu Alaikum. Start with the short Surahs of Juz Amma (the 30th part). Read word-for-word translations alongside a simple, structured Tafseer commentary (like Tafsir Ibn Kathir simplified). Focus on the core message and lessons rather than grammatical debates initially."
            },
            {
                id: "q2",
                question: "How can I build a daily habit of reciting Quran with reflection?",
                answer: "Assalamu Alaikum. Set a very small, achievable target daily—even just one page or five verses. Recite it at a fixed time, preferably after Fajr. Read the translation slowly, and ask yourself: 'How does this verse apply to my life today?'"
            },
            {
                id: "q3",
                question: "Which Surah should I read when looking for hope and comfort?",
                answer: "Assalamu Alaikum. Read Surah Ad-Duha (Chapter 93) or Surah Ash-Sharh (Chapter 94). They were revealed specifically to comfort the Prophet (peace be upon him) during a difficult period, reminding us that with every hardship comes ease and that our Lord has not abandoned us."
            }
        ]
    },
    {
        id: "sajid-umar",
        name: "Sajid Umar",
        title: "Sheikh",
        specialization: "Islamic Finance & Modern Transaction Fiqh",
        status: "online",
        bio: "Mufti and specialist in Islamic commercial jurisprudence, helping Muslims align their careers and businesses with halal guidelines.",
        avatarBg: "bg-cyan-600",
        avatarText: "SU",
        questions: [
            {
                id: "q1",
                question: "What makes a business or transaction contract 'halal' in Islam?",
                answer: "Assalamu Alaikum. A contract is halal if it satisfies three main conditions: mutual consent without coercion, dealing in permissible (halal) goods or services, and the absence of prohibited elements such as interest (Riba), extreme uncertainty (Gharar), or gambling (Maysir)."
            },
            {
                id: "q2",
                question: "Is earning cashback or reward points on credit cards permissible?",
                answer: "Assalamu Alaikum. Yes, earning cashback or reward points on credit cards is generally permissible. Scholars classify these rewards as gifts (Hiba) from the financial institution to the customer, provided that you pay off your card balances in full before any interest is charged."
            },
            {
                id: "q3",
                question: "How should a Muslim invest in modern stock markets ethically?",
                answer: "Assalamu Alaikum. You can invest by choosing companies that pass Shariah screening metrics: avoiding companies that deal primarily in interest, alcohol, gambling, or pork, and ensuring their debt-to-market-cap ratio is below 33%. Many Islamic index funds simplify this process today."
            }
        ]
    },
    {
        id: "tamara-gray",
        name: "Tamara Gray",
        title: "Dr.",
        specialization: "Spiritual Cultivation (Tazkiyah) & Leadership",
        status: "away",
        bio: "Founder of Ribaat Academic Institute, holding a doctorate in leadership and classical ijaza in Islamic spiritual sciences.",
        avatarBg: "bg-fuchsia-600",
        avatarText: "TG",
        questions: [
            {
                id: "q1",
                question: "What is Tazkiyah and how do I apply it to my daily life?",
                answer: "Assalamu Alaikum. Tazkiyah is the conscious process of purifying the soul. Apply it by tracking your negative habits (such as anger or gossip) and replacing them with positive opposites (patience and silence). Begin with daily self-accounting (Muhasabah) before sleep."
            },
            {
                id: "q2",
                question: "How can women develop authentic spiritual leadership?",
                answer: "Assalamu Alaikum. Authentic leadership begins with deep personal study of the classical Islamic sciences, followed by building circles of learning and service. True leaders serve their communities with empathy, humility, and rigorous knowledge."
            },
            {
                id: "q3",
                question: "How do I build consistency in my night prayers (Tahajjud)?",
                answer: "Assalamu Alaikum. Start small and make it achievable. Pray just two voluntary Rak'ahs of Tahajjud before Witr, even if it is only 15 minutes before the Fajr prayer time begins. Consistency is built on small, regular commitments rather than long, sporadic sessions."
            }
        ]
    }
];

export const DEFAULT_RESPONSES = [
    "JazakAllah Khair for reaching out. Please remember that Allah's mercy is limitless, and whatever concern you have, seeking knowledge is a blessed step. Let's work together to find peace and clarity in this matter.",
    "I hear your concern, and it is a sign of your good heart that you are seeking guidance. Let us reflect on how we can align this situation with the teachings of our beloved Prophet (peace be upon him).",
    "May Allah bless you, ease your affairs, and grant you tranquility. Let us take this concern to Him in prayer and proceed with patience and wisdom."
];
