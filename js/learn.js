/* =========================================================
   MARKTSCHULE – Börsenwissen statt Börsen-Magie
   Lektionen, Quiz, "Frage der Woche" & Glossar.
   Ziel: verstehen lernen – nicht Gewinne vorhersagen.
   Wissen wird mit WissensPunkten (XP) und Rängen belohnt.
   ========================================================= */
const Learn = {
    XP_QUESTION: 10,
    XP_LESSON_BONUS: 20,
    XP_WEEKLY: 15,

    RANKS: [
        { min: 0, title: 'Finanz-Neuling', emoji: '🌱' },
        { min: 30, title: 'Wissenssammler', emoji: '📘' },
        { min: 80, title: 'Fonds-Entdecker', emoji: '🔍' },
        { min: 150, title: 'Kurs-Analytiker', emoji: '🧮' },
        { min: 260, title: 'Markt-Profi', emoji: '📈' },
        { min: 400, title: 'Vermögens-Experte', emoji: '🏛️' },
        { min: 600, title: 'Börsen-Elite', emoji: '🎓' }
    ],

    MODULES: [
        {
            id: 'geld',
            cat: 'Grundlagen',
            emoji: '💶',
            title: 'Geld, Inflation & Zinsen',
            summary: 'Warum dein Erspartes jedes Jahr weniger wert ist – und wie Zinseszins dagegen arbeitet.',
            theory: 'Geld ist ein Tauschmittel – aber sein Wert bleibt nicht konstant. Durch Inflation steigen die Preise, deshalb kannst du dir vom gleichen Geldbetrag später weniger kaufen.\nUm zu prüfen, ob dich eine Anlage wirklich reicher macht, rechnest du die Inflation mit ein: Eine Rendite von 2% bei 3% Inflation bedeutet real einen Verlust.\nDer Zinseszins ist das mächtigste Werkzeug des Sparens: Du bekommst nicht nur Zinsen auf dein angelegtes Geld, sondern auch auf die Zinsen der Vorjahre. Je früher du beginnst, desto stärker wirkt er.',
            knowledge: 'Schon 100 € pro Monat über 30 Jahre mit 6% Rendite ergeben über 100.000 € – bei nur ~36.000 € eingezahltem Geld. Das ist Zinseszinz + Zeit.',
            questions: [
                { q: 'Was passiert bei Inflation mit deinem ersparten Geld?', options: ['Es gewinnt an Kaufkraft', 'Es verliert an Kaufkraft', 'Es bleibt immer gleich viel wert', 'Es wird automatisch versteuert'], correct: 1, explanation: 'Bei Inflation steigen die Preise – dein Geld kauft also weniger. Deshalb sollte es Rendite erwirtschaften.' },
                { q: 'Was bedeutet Zinseszins?', options: ['Nur der angelegte Grundbetrag bringt Zinsen', 'Zinsen werden auch auf bereits gutgeschriebene Zinsen gezahlt', 'Zinsen gibt es nur bei Tagesgeld', 'Zinseszins ist eine Gebühr der Bank'], correct: 1, explanation: 'Zinseszins = Zinsen auf Zinsen. Dadurch wächst dein Vermögen exponentiell, wenn du früh und regelmäßig investierst.' },
                { q: 'Die "goldene Regel der Geldanlage" nennt drei Ziele – welche?', options: ['Rendite, Sicherheit, Liquidität', 'Schnell, schlau, sparsam', 'Aktien, Immobilien, Gold', 'Sparen, Investieren, Ausgeben'], correct: 0, explanation: 'Rendite (wie viel?) · Sicherheit (wie riskant?) · Liquidität (wie schnell verfügbar?). Perfekt sind alle drei nie gleichzeitig.' }
            ]
        },
        {
            id: 'aktien',
            cat: 'Aktien',
            emoji: '📈',
            title: 'Aktien & die Börse',
            summary: 'Von Anteilsscheinen bis Dividenden: Wie Aktien funktionieren und was den Kurs bewegt.',
            theory: 'Eine Aktie ist ein Anteilsschein an einem Unternehmen. Als Aktionär bist du Miteigentümer – teilst dir Gewinne und Chancen, aber auch Verluste mit.\nDer Kurs entsteht an der Börse durch Angebot und Nachfrage: Verkaufen viele, fällt der Kurs; kaufen viele, steigt er. Dazu kommen Geschäftszahlen, Nachrichten und die allgemeine Wirtschaftslage.\nViele Unternehmen schütten Teile ihres Gewinns als Dividende an ihre Aktionäre aus. Dividenden kannst du dir auszahlen lassen oder neue Anteile kaufen (sie reinvestieren).',
            knowledge: 'Langfristig haben Aktienmärkte im Durchschnitt deutlich besser abgeschnitten als jede andere Anlageklasse – die verwirrende Zwischenzeit mit Kursschwankungen gehört zum Spiel.',
            questions: [
                { q: 'Was ist eine Aktie genau?', options: ['Ein teures Sammlerbild der Firma', 'Ein Anteilsschein an einem Unternehmen', 'Ein Kredit, den du der Bank gibst', 'Ein Sparbuch mit festem Zins'], correct: 1, explanation: 'Aktien = Anteile am Unternehmen. Du bist Miteigentümer und profitierst von dessen Erfolg.' },
                { q: 'Wovon hängt der Aktienkurs an der Börse hauptsächlich ab?', options: ['Von der Farbe des Logos', 'Von Angebot und Nachfrage', 'Nur von der Inflation', 'Von der Länge der Geschäftsführung'], correct: 1, explanation: 'Börse ist ein Markt: Wer mehr kaufen als verkaufen will, treibt den Kurs nach oben – und umgekehrt.' },
                { q: 'Was ist eine Dividende?', options: ['Eine Steuer auf Aktien', 'Die Gewinnbeteiligung an Aktionäre', 'Der Einkaufspreis einer Aktie', 'Ein Gebührenrabatt der Börse'], correct: 1, explanation: 'Dividende = Teil des Gewinns, den das Unternehmen an seine Aktionäre ausschüttet. Sie wird oft pro Aktie angegeben.' }
            ]
        },
        {
            id: 'etf',
            cat: 'ETFs & Fonds',
            emoji: '📊',
            title: 'ETFs – das Sparer-Spezial',
            summary: 'Diversifikation ohne großen Aufwand: Warum ETFs die Basis für die meisten Depots sind.',
            theory: 'Ein ETF (Exchange Traded Fund) bildet einen Index nach – zum Beispiel den DAX oder den MSCI World. Statt einer einzelnen Aktie hältst du über einen ETF automatisch viele Unternehmen auf einmal.\nGenau das nennt man Diversifikation: Geht ein Unternehmen pleite, fällt das nur minimal ins Gewicht, weil Hunderte andere im Fonds stecken.\nETFs laufen passiv (die Zusammensetzung bildet einfach den Index ab) und sind deshalb sehr günstig. Schon mit kleinen Beträgen – etwa über einen ETF-Sparplan – investierst du breit gestreut.',
            knowledge: 'Ein All-World-ETF enthält typischerweise mehrere tausend Unternehmen aus aller Welt – komplette Weltwirtschaft mit einem einzigen Wertpapier.',
            questions: [
                { q: 'Was bedeutet Diversifikation?', options: ['Alles Geld in eine Aktie stecken', 'Das Risiko auf viele Werte verteilen', 'Geld ausschließlich in Gold anlegen', 'Jede Woche das Depot wechseln'], correct: 1, explanation: 'Diversifikation = Risikostreuung. Viele Werte mindern den Schaden einzelner Verlierer.' },
                { q: 'Was bildet ein ETF in der Regel nach?', options: ['Ein einzelnes Unternehmen', 'Einen Index wie DAX oder MSCI World', 'Die besten Anekdoten von Analysten', 'Den Leitzins der EZB'], correct: 1, explanation: 'Der ETF kauft automatisch die Werte des Index – passiv, transparent und günstig.' },
                { q: 'Warum sind ETFs so beliebt für Sparpläne?', options: ['Sie sind steuerfrei', 'Breite Streuung schon mit kleinen Beträgen', 'Man kann nur einmal im Jahr investieren', 'Kurse fallen mit dem ETF nie'], correct: 1, explanation: 'Sparpläne ab kleinen Beträgen + breite Streuung + niedrige Kosten = ideale Basis-Anlage für Einsteiger.' }
            ]
        },
        {
            id: 'risiko',
            cat: 'Risiko & Strategie',
            emoji: '🛡️',
            title: 'Risiko & Anlagestrategie',
            summary: 'Rendite und Risiko gehören zusammen – und die richtige Strategie entscheidet über deinen Erfolg.',
            theory: 'In der Finanzwelt gilt: Höhere Renditechancen gehen fast immer mit höherem Risiko einher. Wer mit Bitcoin spekuliert, kann fetten Gewinn machen – aber auch tief fallen. Wer nur auf dem Sparbuch parkt, hat keine Verluste, aber auch kaum Rendite.\nDie beste Waffe gegen Risiko ist die Streuung über verschiedene Anlageklassen (Aktien, ETFs, Immobilien, Krypto in kleinen Portionen).\nRegelmäßiges Investieren in festen Abständen nutzt den Cost-Average-Effekt: Du kaufst automatisch mehr Anteile, wenn die Kurse niedrig sind, und weniger, wenn sie hoch sind. So glättest du deinen Einstiegspreis über die Zeit.',
            knowledge: 'Selbst Profis schlagen den Markt langfristig nur selten. Klüger als "den perfekten Zeitpunkt" zu suchen: früh anfangen und lange dabei bleiben.',
            questions: [
                { q: 'Wie hängen Renditechancen und Risiko zusammen?', options: ['Je höher die Chance, desto höher das Risiko', 'Rendite ist völlig unabhängig vom Risiko', 'Niedriges Risiko bringt immer hohe Rendite', 'Das Risiko bestimmt der Bundesfinanzminister'], correct: 0, explanation: 'Risiko und Rendite sind Geschwister: Wer mehr ernten will, muss mehr Schwankung aushalten.' },
                { q: 'Was ist der Cost-Average-Effekt?', options: ['Durchschnitt ist immer teurer als Einzelkauf', 'Regelmäßiges Investieren glättet den Einstiegspreis', 'Man kauft nur bei Höchstkursen ein', 'Kosten errechnen sich im Mittel weg'], correct: 1, explanation: 'Feste Sparraten kaufen bei niedrigen Kursen mehr Anteile – dein Durchschnittskurs sinkt über Schocks hinweg.' },
                { q: 'Welche Aussage ist richtig?', options: ['Alles Geld in eine Aktie = maximal gestreut', 'Ein Notgroschen bei Krypto liegt am besten', 'Anlagehorizont sollte zur Risikowahl passen', 'Kurse steigen grundsätzlich jeden Tag'], correct: 2, explanation: 'Lange Horizonte erlauben riskantere, chancenreichere Anlagen; kurzfristiges Geld gehört sicher geparkt.' }
            ]
        },
        {
            id: 'steuer',
            cat: 'Steuern & Depot',
            emoji: '🧾',
            title: 'Steuern & dein Depot',
            summary: 'Sparerpauschbetrag, Kapitalertragsteuer und Verlustverrechnung – einfach erklärt.',
            theory: 'In Deutschland werden Kapitalerträge besteuert – Gewinne aus Aktien, ETFs und Zinsen. Die Abgeltungsteuer beträgt 25% plus 5,5% Solidaritätszuschlag darauf, zusammen 26,375%.\nDer Sparerpauschbetrag (1.000 € pro Person und Jahr) macht die ersten 1.000 € Gewinn steuerfrei. Oft lohnt sich ein Freistellungsauftrag bei der Bank, damit das automatisch berücksichtigt wird.\nVerluste hast du ausgeglichen, wenn du Aktien mit Verlust verkaufst: Sie werden mit Gewinnen verrechnet (Verlustverrechnung). So zahlst du nur auf den tatsächlichen Nettogewinn Steuern.',
            knowledge: 'Im Spiel wird das echte Prinzip simuliert: Steuern werden beim Verkauf automatisch einbehalten, der Freibetrag gilt pro Jahr – wie bei deinem richtigen Depot.',
            questions: [
                { q: 'Wie hoch ist die Kapitalertragsteuer inklusive Solidaritätszuschlag?', options: ['15%', '25%', '26,375%', '42%'], correct: 2, explanation: '25% Kapitalertragsteuer + 5,5% Soli auf die Steuer = 26,375% insgesamt.' },
                { q: 'Was ist der Sparerpauschbetrag?', options: ['Ein Rabatt des Bankberaters', '1.000 € Gewinn pro Jahr steuerfrei', 'Eine Prämie für Sparbücher', 'Die Gebühr, die beim Depotwechsel anfällt'], correct: 1, explanation: 'Pro Person und Jahr bleiben 1.000 € Kapitalerträge steuerfrei – oft geregelt per Freistellungsauftrag.' },
                { q: 'Was passiert mit realisierten Verlusten aus Aktienverkäufen?', options: ['Sie verfallen sofort', 'Sie werden mit Gewinnen verrechnet', 'Sie erhöhen die Steuer', 'Sie werden als Bonus erstattet'], correct: 1, explanation: 'Verlustverrechnung: Verluste mindern dein steuerpflichtiges Ergebnis – auf realisierte Nettogewinne zahlst du Steuern.' }
            ]
        },
        {
            id: 'wirtschaft',
            cat: 'Wirtschaft & News',
            emoji: '🏛️',
            title: 'Wirtschaft verstehen',
            summary: 'DAX, Leitzins und BIP: die wichtigsten Begriffe rund um Konjunktur und Nachrichten.',
            theory: 'Der DAX ist der wichtigste deutsche Aktienindex und bildet die 40 größten börsennotierten Konzerne ab. Steigt der DAX, geht es den Firmenwerten insgesamt tendenziell gut.\nDie Europäische Zentralbank (EZB) steuert mit dem Leitzins die Wirtschaft: Sinkende Zinsen machen Kredite günstiger und treiben oft Aktienkurse. Steigende Zinsen bremsen die Konjunktur und können Kurse drücken.\nDas BIP (Bruttoinlandsprodukt) misst den Wert aller in einem Land in einem Jahr produzierten Güter und Dienstleistungen – der wichtigste Gradmesser für das Wirtschaftswachstum.',
            knowledge: 'Nachrichten wirken auf Kurse – oft emotional. Oft sind genau dann die besten Kaufgelegenheiten, wenn die Schlagzeilen besonders düster sind.',
            questions: [
                { q: 'Was bildet der DAX ab?', options: ['Die 40 größten Konzerne Deutschlands', 'Alle Unternehmen Europas', 'Die 10 größten deutschen Kellereien', 'Den Leitzins der Bundesbank'], correct: 0, explanation: 'Der DAX steht als Deutscher Aktienindex für die 40 größten börsennotierten Unternehmen Deutschlands.' },
                { q: 'Welche Wirkung hat ein sinkender Leitzins der EZB?', options: ['Kredite werden teurer', 'Kredite werden günstiger, Aktien oft attraktiver', 'Alle Preise steigen automatisch', 'Der DAX verschwindet'], correct: 1, explanation: 'Günstigere Zinsen machen Schulden, Konsum und Investitionen billiger – das stützt häufig die Aktienkurse.' },
                { q: 'Wofür steht "BIP"?', options: ['Börslicher Jahresplan', 'Barwert aller Immobilien', 'Bruttoinlandsprodukt', 'Bundesinstitut für Preisstabilität'], correct: 2, explanation: 'Das BIP misst die Wirtschaftsleistung eines Landes: der Wert aller produzierten Güter und Dienstleistungen in einem Jahr.' }
            ]
        }
    ],

    GLOSSARY: [
        { emoji: '📄', term: 'Aktie', text: 'Anteilsschein an einem Unternehmen. Mit einer Aktie bist du Miteigentümer und teilst Gewinne wie Verluste.' },
        { emoji: '📊', term: 'ETF', text: 'Exchange Traded Fund – ein Fonds, der einen Index (z.B. DAX oder MSCI World) nachbildet und breit streut.' },
        { emoji: '📉', term: 'Index', text: 'Korb aus vielen Aktien als Messlatte für den Markt. Beispiele: DAX, MSCI World, S&P 500.' },
        { emoji: '💶', term: 'Dividende', text: 'Gewinnausschüttung eines Unternehmens an seine Aktionäre, meist pro Jahr und pro Aktie.' },
        { emoji: '📈', term: 'Rendite', text: 'Der Ertrag einer Anlage in Prozent – wie viel dein Kapital im Vergleich zum Einsatz abwirft.' },
        { emoji: '🔄', term: 'Zinseszins', text: 'Zinsen, die auf bereits gutgeschriebene Zinsen gezahlt werden. Dadurch wächst Kapital exponentiell.' },
        { emoji: '🛒', term: 'Inflation', text: 'Anstieg des allgemeinen Preisniveaus. Grob gesagt: Dein Geld wird im Laufe der Zeit weniger wert.' },
        { emoji: '🧺', term: 'Diversifikation', text: 'Risikostreuung über mehrere Anlagen. Fällt eine Anlage, steckt das Gesamtportfolio es meist weg.' },
        { emoji: '💱', term: 'Kurs', text: 'Der aktuelle Preis eines Wertpapiers. Der Aus- und Einfluss von Angebot und Nachfrage bestimmt ihn.' },
        { emoji: '🏦', term: 'Depot', text: 'Dein Konto für Wertpapiere – dort werden Aktien, ETFs und Co. sicher verwahrt.' },
        { emoji: '🧾', term: 'Sparerpauschbetrag', text: '1.000 € Kapitalerträge, die pro Person und Jahr steuerfrei bleiben (via Freistellungsauftrag).' },
        { emoji: '💼', term: 'Kapitalertragsteuer', text: '25% (zusammen 26,375% mit Soli) auf Kapitalerträge in Deutschland. Verluste werden verrechnet.' },
        { emoji: '🌊', term: 'Volatilität', text: 'Maß für die Schwankung eines Kurses. Hohe Volatilität = nervöse, günstig wirkende Kurse – aber auch hohes Risiko.' },
        { emoji: '🏗️', term: 'BIP', text: 'Bruttoinlandsprodukt – der Wert aller in einem Land in einem Jahr produzierten Güter und Dienstleistungen.' },
        { emoji: '🏛️', term: 'Leitzins', text: 'Der Zins, zu dem die Zentralbank Banken Geld leiht. Er steuert die Geldpolitik und beeinflusst die Börsen.' }
    ],

    WEEKLY_POOL: [
        { question: 'Wovon lebt der Zinseszins-Anteil deines Vermögens?', options: ['Zinsen auf Zinsen', 'Das Land, in dem die Bank sitzt', 'Die Dauer der Börsenöffnung', 'Zinsen auf dein Gehalt'], correct: 0, explanation: 'Zinsen auf Zinsen lassen dein Vermögen exponentiell wachsen.' },
        { question: 'Welche Anlage streut dein Risiko am stärksten?', options: ['Eine einzelne Aktie', 'Ein weltweiter ETF', 'Ein einzelnes Edelmetall-Münzset', 'Alles Giralgeld auf dem Tagesgeldkonto'], correct: 1, explanation: 'Ein All-World-ETF hält tausende Unternehmen aus aller Welt.' },
        { question: 'Was ist beim Kauf einer Einzelaktie das größte Risiko?', options: ['Die Aktie kann an Wert verlieren', 'Die Dividende ist garantiert', 'Man verliert nur die Dividende', 'Die Börse verrechnet keine Gebühren'], correct: 0, explanation: 'Einzelwerte können stark fallen – Unternehmen gehen auch pleite. Streuung schützt.' },
        { question: 'Wozu dient der Sparerpauschbetrag?', options: ['Um Gebühren zu sparen', 'Bis zu 1.000 € Gewinn steuerfrei zu erzielen', 'Um Kredite zinsfrei zu bekommen', 'Um Dividenden zu verdoppeln'], correct: 1, explanation: 'Der Freibetrag (1.000 €/Jahr) macht deine erste Gewinntranche steuerfrei.' },
        { question: 'Welche Aussage über Aktien und Zeit ist realistisch?', options: ['Kurze Haltedauer immer sicher', 'Langfristig glätten sich Schwankungen meist', 'Aktien sind nie riskant', 'Nur die Vergangenheit zählt'], correct: 1, explanation: 'Je länger der Anlagehorizont, desto geringer die Wahrscheinlichkeit, insgesamt Verlust zu machen.' },
        { question: 'Was bedeutet "26,375% Abgeltungsteuer"?', options: ['25% Steuer + 5,5% Soli darauf', 'Eine Sonderabgabe für Profis', 'Das gleiche wie Einkommensteuer', 'Eine Gebühr je Depotposten'], correct: 0, explanation: '25% Kapitalertragsteuer plus 5,5% Solidaritätszuschlag auf den Steuerbetrag ergeben 26,375%.' }
    ],

    ensureState() {
        if (!GameState.learn) {
            GameState.learn = {
                xp: 0,
                correct: 0,
                wrong: 0,
                streak: 0,
                bestStreak: 0,
                questionsAnswered: 0,
                answered: {},
                lessonCompleted: [],
                weekly: null,
                weeklyWeek: 0,
                weeklyAnswered: false,
                weeklyCorrect: false,
                weeklyPick: null
            };
        }
        const l = GameState.learn;
        if (typeof l.xp !== 'number') l.xp = 0;
        if (typeof l.correct !== 'number') l.correct = 0;
        if (typeof l.wrong !== 'number') l.wrong = 0;
        if (typeof l.streak !== 'number') l.streak = 0;
        if (typeof l.bestStreak !== 'number') l.bestStreak = 0;
        if (typeof l.questionsAnswered !== 'number') l.questionsAnswered = 0;
        if (!l.answered) l.answered = {};
        if (!l.lessonCompleted) l.lessonCompleted = [];
        if (!l.weekly || l.weeklyWeek !== GameState.week) {
            l.weekly = this.pickWeekly();
            l.weeklyWeek = GameState.week;
            l.weeklyAnswered = false;
            l.weeklyPick = null;
            l.weeklyCorrect = false;
        }
        return l;
    },

    newWeek() {
        const l = this.ensureState();
        l.weekly = this.pickWeekly();
        l.weeklyWeek = GameState.week;
        l.weeklyAnswered = false;
        l.weeklyPick = null;
        l.weeklyCorrect = false;
        return l;
    },

    pickWeekly() {
        const pool = this.WEEKLY_POOL;
        return pool[Math.floor(Math.random() * pool.length)];
    },

    rank() {
        const xp = this.ensureState().xp;
        let current = this.RANKS[0];
        for (const r of this.RANKS) {
            if (xp >= r.min) current = r;
        }
        return current;
    },

    awardXp(amount) {
        const l = this.ensureState();
        l.xp += amount;
        return amount;
    },

    answerWeekly(idx) {
        const l = this.ensureState();
        if (l.weeklyAnswered || idx === null || idx === undefined) return null;
        const wq = l.weekly;
        if (!wq) return null;
        const correct = idx === wq.correct;
        l.weeklyAnswered = true;
        l.weeklyPick = idx;
        l.weeklyCorrect = correct;
        if (correct) {
            l.correct++;
            l.streak++;
            l.bestStreak = Math.max(l.bestStreak, l.streak);
            l.xp += this.XP_WEEKLY;
        } else {
            l.wrong++;
            l.streak = 0;
        }
        l.questionsAnswered++;
        return { correct, xp: correct ? this.XP_WEEKLY : 0, explanation: wq.explanation };
    },

    answerLesson(moduleId, qIdx, pick) {
        const l = this.ensureState();
        const m = this.MODULES.find(x => x.id === moduleId);
        if (!m) return null;
        const q = m.questions[qIdx];
        if (!q) return null;
        const solved = l.answered[m.id] || (l.answered[m.id] = []);
        if (solved[qIdx]) return null;

        const correct = pick === q.correct;
        let gained = 0;
        solved[qIdx] = true;
        l.questionsAnswered++;

        if (correct) {
            l.correct++;
            l.streak++;
            l.bestStreak = Math.max(l.bestStreak, l.streak);
            gained += this.XP_QUESTION;
            l.xp += this.XP_QUESTION;
        } else {
            l.wrong++;
            l.streak = 0;
        }

        if (solved.filter(Boolean).length === m.questions.length && l.lessonCompleted.indexOf(m.id) === -1) {
            l.lessonCompleted.push(m.id);
            gained += this.XP_LESSON_BONUS;
            l.xp += this.XP_LESSON_BONUS;
        }

        return { correct, xp: gained, explanation: q.explanation };
    }
};