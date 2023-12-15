export const actions = [
  {
      "fullName": "Поддержание заклинания (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=73\">Sustain a Spell</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Поддержание заклинания",
      "traits": [
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-sustain-a-spell\"></span><p><strong>Требования</strong>: У вас есть хотя бы одно активное заклинание с поддерживаемой продолжительностью, и вы не имеете состояние <span class=\"c-fatigued\">утомление</span></p><hr class=\"docutils\"><p>Выберите одно имеющееся у вас активное в данный момент заклинание с поддерживаемой продолжительностью.\nВремя действия этого заклинания продолжается до конца вашего следующего хода.\nНекоторые заклинания могут иметь несколько другие или расширенные эффекты если вы их поддерживаете.\n\"Поддержание заклинания\" более 10 минут (100 раундов) завершает заклинание и делает вас <span class=\"c-fatigued\">утомленным</span>, если только заклинание не указывает другую максимальную продолжительность (как например \"поддерживаемое вплоть до 1 минуты\" или \"поддерживаемое вплоть до 1 часа\").</p><p>Если ваше действие \"Поддержание заклинания\" прерывается, то это заклинание мгновенно заканчивается.</p>",
      "src": "",
      "originalName": "Sustain a Spell",
      "action": "одиночное действие",
      "id": "action-sustain-a-spell"
  },
  {
      "fullName": "Развеять (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=74\">Dismiss</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Развеять",
      "traits": [
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-dismiss\"></span><p>Вы завершаете эффект одного заклинания или эффект магического предмета.\nЭто должен быть эффект, который вы можете развеять, как определено заклинанием или предметом.\nВ зависимости от заклинания или предмета, развеивание может полностью прекратить эффект или сделать это только для определенной цели или целей.</p>",
      "src": "",
      "originalName": "Dismiss",
      "action": "одиночное действие",
      "id": "action-dismiss"
  },
  {
      "fullName": "Удар (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=89\">Strike</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Удар",
      "traits": [
          "атака"
      ],
      "rarity": "",
      "desc": "<span id=\"action-strike\"></span><p>Вы атакуете оружием, которым владеете или безоружной атакой, целясь в одно существо в пределах вашей досягаемости (для ближней атаки) или в пределах дистанции (для дистанционной атаки).\nСделайте бросок атаки используемого оружия или безоружной атакой и сравните результат с КБ цели для определения эффекта.\nСмотрите раздел <a class=\"reference internal\" href=\"#ch9-attack-rolls\"><span class=\"std std-ref\">Броски атак (Attack Rolls)</span></a> и <a class=\"reference internal\" href=\"#ch9-damage\"><span class=\"std std-ref\">Урон (Damage)</span></a> по поводу подробностей о вычислении бросков атак и урона.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Как успех, но вы наносите двойной урон (см. <a class=\"reference internal\" href=\"#ch9-damage-double-half\"><span class=\"std std-ref\">Двойной урон и половинный урон (Doubling and Halving Damage)</span></a>).</div>\n<div class=\"line\"><strong>Успех</strong>: Вы наносите урон, в соответствии оружию или безоружной атаке, включая любые имеющиеся у вас модификаторы, бонусы и штрафы на урон.</div>\n</div>",
      "src": "",
      "originalName": "Strike",
      "action": "одиночное действие",
      "id": "action-strike"
  },
  {
      "fullName": "Перемещение (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=88\">Stride</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Перемещение",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-stride\"></span><p>Вы двигаетесь на расстояние вплоть до вашей Скорости (см. <a class=\"reference internal\" href=\"#ch9-enc-movement-in-encounters\"><span class=\"std std-ref\">Передвижение в столкновениях (Movement in Encounters)</span></a>).</p>",
      "src": "",
      "originalName": "Stride",
      "action": "одиночное действие",
      "id": "action-stride"
  },
  {
      "fullName": "Шаг (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=87\">Step</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Шаг",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-step\"></span><p><strong>Требования</strong>: Ваша Скорость как минимум 10 футов</p><hr class=\"docutils\"><p>Вы осторожно двигаетесь на 5 футов.\nВ отличие от большинства видов движения, Шаг не провоцирует реакции, такие как <a class=\"reference internal\" href=\"#action-attack-of-opportunity\"><span class=\"std std-ref\">Возможность для атаки (Attack of Opportunity) </span></a>, которые могут быть спровоцированы действиями с признаком <span class=\"t-move\">движение</span>, либо при входе в квадрат или выходе из него.</p><p>Вы не можете Шагать на сложной местности (см. <a class=\"reference internal\" href=\"#ch9-difficult-terrain\"><span class=\"std std-ref\">Сложная местность (Difficult Terrain)</span></a>), и вы не можете Шагать, применяя Скорость отличную от наземной.</p>",
      "src": "",
      "originalName": "Step",
      "action": "одиночное действие",
      "id": "action-step"
  },
  {
      "fullName": "Взаимодействовать (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=80\">Interact</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Взаимодействовать",
      "traits": [
          "воздействие"
      ],
      "rarity": "",
      "desc": "<span id=\"action-interact\"></span><p>Вы используете вашу руку или руки, чтобы воздействовать на объект или местность.\nВы можете взять ничейный или убранный объект, открыть дверь, или произвести подобный эффект.\nВозможно вам придется совершить проверку навыка, чтобы определить успешность Взаимодействия.</p>",
      "src": "",
      "originalName": "Interact",
      "action": "одиночное действие",
      "id": "action-interact"
  },
  {
      "fullName": "Прыжок (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=81\">Leap</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Прыжок",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-leap\"></span><p>Вы делаете осторожный короткий прыжок.\nВы можете сделать Прыжок горизонтально на расстояние вплоть до 10 футов, если ваша Скорость как минимум 15 футов, или горизонтально на расстояние вплоть до 15 футов, если ваша Скорость как минимум 30 футов.\nВы приземляетесь в пространстве где заканчивается Прыжок (это значит, что вы обычно можете пересечь 5-футовую яму, или 10-футовую яму если ваша Скорость 30 футов или более).</p><p>Если вы Прыгаете вертикально, то можете переместиться вертикально на приподнятую поверхность вплоть до 3 футов и горизонтально на 5 футов.</p><p>Прыжки на большую дистанцию требуют использовать навык Атлетика.</p>",
      "src": "",
      "originalName": "Leap",
      "action": "одиночное действие",
      "id": "action-leap"
  },
  {
      "fullName": "Упасть ничком (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=78\">Drop Prone</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Упасть ничком",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-drop-prone\"></span><p>Вы ложитесь <span class=\"c-prone\">ничком</span>.</p>",
      "src": "",
      "originalName": "Drop Prone",
      "action": "одиночное действие",
      "id": "action-drop-prone"
  },
  {
      "fullName": "Ползти (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=76\">Crawl</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Ползти",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-crawl\"></span><p><strong>Требования</strong>: Вы лежите <span class=\"c-prone\">ничком</span> и ваша Скорость как минимум 10 футов</p><hr class=\"docutils\"><p>Вы перемещаетесь на 5 футов ползком и остаетесь <span class=\"c-prone\">ничком</span> на земле.</p>",
      "src": "",
      "originalName": "Crawl",
      "action": "одиночное действие",
      "id": "action-crawl"
  },
  {
      "fullName": "Встать (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=86\">Stand</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Встать",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-stand\"></span><p>Встаете из положения <span class=\"c-prone\">ничком</span>.</p>",
      "src": "",
      "originalName": "Stand",
      "action": "одиночное действие",
      "id": "action-stand"
  },
  {
      "fullName": "Укрыться (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=90\">Take Cover</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Укрыться",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-take-cover\"></span><p><strong>Требования</strong>: Вы получаете преимущество от укрытия, находитесь рядом с чем-то, что позволяет вам укрыться, или вы лежите <span class=\"c-prone\">ничком</span></p><hr class=\"docutils\"><p>Вы прижимаетесь к стене или садитесь за препятствие, чтобы лучше укрыться за ним (см. <a class=\"reference internal\" href=\"#ch9-cover\"><span class=\"std std-ref\">Укрытие (Cover)</span></a>).\nЕсли бы у вас было стандартное укрытие, то вы вместо этого получаете большое укрытие, которое дает бонус обстоятельства +4 к КБ, спасброскам Рефлекса против эффектов по области, и проверкам Скрытности для <a class=\"reference internal\" href=\"skills.html#skill-stealth-hide\"><span class=\"std std-ref\">Спрятаться (Hide) </span></a>, <a class=\"reference internal\" href=\"skills.html#skill-stealth-sneak\"><span class=\"std std-ref\">Красться (Sneak) </span></a> или другим способом избегать обнаружения.\nИначе, вы получаете преимущества стандартного укрытия (бонус обстоятельства +2).\nЭто длится пока вы не покините свое текущее пространство, используете атакующее действие, <span class=\"c-unconscious\">потеряете сознание</span>, или завершите этот эффект используя свободное действие.</p>",
      "src": "",
      "originalName": "Take Cover",
      "action": "одиночное действие",
      "id": "action-take-cover"
  },
  {
      "fullName": "Вырваться (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=79\">Escape</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Вырваться",
      "traits": [
          "атака"
      ],
      "rarity": "",
      "desc": "<span id=\"action-escape\"></span><p>Вы пытаетесь вырваться, из состояния <span class=\"c-grabbed\">схвачен</span>, <span class=\"c-immobilized\">обездвижен</span> или <span class=\"c-restrained\">сдерживаем</span>.\nВыберите одно существо, объект, эффект заклинания, опасность, или другое препятствие применяющее на вас любое из этих состояний.\nСовершите проверку используя ваш модификатор безоружной атаки против КС эффекта.\nОбычно это КС Атлетики схватившего вас существа, КС Воровства связавшего вас, КС заклинания для эффекта заклинания или указанный КС Вырваться для объекта, опасности или другого препятствия.\nЕсли хотите, то можете использовать проверку Акробатики или Атлетики вместо модификатора безоружной атаки (но это действие все еще будет иметь признак <span class=\"t-attack\">атака</span>).</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Вы освобождаетесь и избавляетесь от состояний <span class=\"c-grabbed\">схвачен</span>, <span class=\"c-immobilized\">обездвижен</span> и <span class=\"c-restrained\">сдерживаем</span> наложенных выбранной целью. После этого вы можете <a class=\"reference internal\" href=\"#action-stride\"><span class=\"std std-ref\">Переместиться (Stride)</span></a> на расстояние вплоть до 5 футов.</div>\n<div class=\"line\"><strong>Успех</strong>: Вы освобождаетесь и избавляетесь от состояний <span class=\"c-grabbed\">схвачен</span>, <span class=\"c-immobilized\">обездвижен</span> и <span class=\"c-restrained\">сдерживаем</span> наложенных выбранной целью.</div>\n<div class=\"line\"><strong>Критический провал</strong>: Вы не освобождаетесь и не можете попытаться Вырваться снова до своего следующего хода.</div>\n</div>",
      "src": "",
      "originalName": "Escape",
      "action": "одиночное действие",
      "id": "action-escape"
  },
  {
      "fullName": "Поиск (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=84\">Seek</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Поиск",
      "traits": [
          "тайна",
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-seek\"></span><p>Вы проверяете область на наличие существ или объектов.\nЕсли вы ищете существ, выберите область которую вы проверяете.\nЕсли необходима точность, Мастер может позволить выбрать 30-футовый конус или 15-футовый взрыв в пределах поля зрения.\nВы можете получить штраф, если эта область находится далеко.</p><p>Если вы осуществляете Поиск объектов (включая потайные двери или опасности), то обыскиваете вплоть до 10-футового квадрата находящегося рядом с вами.\nМастер может решить, что вы должны делать Поиск в виде активности, тратя больше действий или даже минуты или часы, если ищете в особенно захламленной области.</p><p>Мастер совершает за вас одиночную <span class=\"t-secret\">тайную</span> проверку Восприятия и сравнивает результат с КС Скрытности любых <span class=\"c-undetected\">необнаруженных</span> или <span class=\"c-hidden\">спрятанных</span> в области существ, или с КС обнаружения каждого объекта в области (по решению Мастера или кого-то, кто использовал <a class=\"reference internal\" href=\"skills.html#skill-stealth-conceal-an-object\"><span class=\"std std-ref\">Скрыть объект (Conceal an Object) </span></a>).\nОбнаруженное вами существо может остаться <span class=\"c-hidden\">спрятанным</span>, вместо того чтобы стать <span class=\"c-observed\">замеченым</span>, если вы используете неточное чувство или если эффект (такой как <a class=\"reference internal\" href=\"spells/I/invisibility.html#spell-i-invisibility\"><span class=\"std std-ref\">Невидимость (Invisibility) / Закл. 2</span></a>) препятствует тому, чтобы субъект стал <span class=\"c-observed\">замеченым</span>.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Если вы искали существ, то любое <span class=\"c-undetected\">необнаруженное</span> или <span class=\"c-hidden\">спрятанное</span> существо против которого вы критически преуспели, становится для вас <span class=\"c-observed\">замеченым</span>. Если вы искали объект, то узнаете его местоположение.</div>\n<div class=\"line\"><strong>Успех</strong>: Если вы искали существ, то любое <span class=\"c-undetected\">необнаруженное</span> существо против которого вы преуспели, становится для вас <span class=\"c-hidden\">спрятанным</span> а не <span class=\"c-undetected\">необнаруженным</span>, а любое <span class=\"c-hidden\">спрятанное</span> существо, становится для вас <span class=\"c-observed\">замеченым</span>. Если вы искали объект, то по решению Мастера вы узнаете его местоположение или получаете подсказку о его примерном местонахождении.</div>\n</div>",
      "src": "",
      "originalName": "Seek",
      "action": "одиночное действие",
      "id": "action-seek"
  },
  {
      "fullName": "Понять намерение (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=85\">Sense Motive</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Понять намерение",
      "traits": [
          "тайна",
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-sense-motive\"></span><p>Вы пытаетесь понять является ли поведение существа нетипичным.\nВыберите одно существо и оцените его на предмет странного языка тела, признаков нервозности, и других знаков, что оно может пытаться обманывать кого-нибудь.\nМастер совершает за вас одиночную <span class=\"t-secret\">тайную</span> проверку Восприятия и сравнивает результат с КС Обмана существа, КС заклинания действующего на ментальное состояние существа, или другой подходящий КС на усмотрение Мастера.\nОбычно вы не можете \"Понять намерение\" того же существа снова, пока ситуация не измениться значительным образом.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Вы определяете истинные намерения существа и понимаете, что за <span class=\"t-mental\">ментальная</span> магия действует на него</div>\n<div class=\"line\"><strong>Успех</strong>: Вы можете сказать вело ли себя существо нормально, но не знаете его точные намерения или какая магия могла бы действовать на него</div>\n<div class=\"line\"><strong>Провал</strong>: Вы определяете, во что обманывающее существо хочет, чтобы вы верили. Если оно не обманывает, то вы считаете, что оно ведет себя нормально.</div>\n<div class=\"line\"><strong>Критический провал</strong>: Вы получаете ложное представление о намерениях существа.</div>\n</div>",
      "src": "",
      "originalName": "Sense Motive",
      "action": "одиночное действие",
      "id": "action-sense-motive"
  },
  {
      "fullName": "Приготовиться (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=82\">Ready</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Приготовиться",
      "traits": [
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-ready\"></span><p>Вы готовитесь использовать действие, которое произойдет вне вашего хода.\nВыберите одиночное или свободное действие, которое вы можете использовать и определите триггер.\nПосле этого ваш ход завершается.\nЕсли определенный вами триггер случается до начала вашего следующего хода, вы можете использовать выбранное действие как реакцию (при условии, что вы все еще отвечаете требованиям, чтобы использовать его).\nВы не можете Приготовиться использовать свободное действие, которое уже имеет триггер.</p><p>Если у вас есть штраф множественной атаки и подготовленное вами действие является <span class=\"t-attack\">атакующим</span>, то эта подготовленная атака получает штраф множественной атаки, соответствующий времени когда вы использовали Приготовиться.\nЭто один из немногих случаев, когда штраф множественной атаки применяется вне вашего хода.</p>",
      "src": "",
      "originalName": "Ready",
      "action": "активность из 2-х действий",
      "id": "action-ready"
  },
  {
      "fullName": "Поднять щит (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=98\">Raise a Shield</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Поднять щит",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-raise-a-shield\"></span><p><strong>Требования</strong>: Вы владеете щитом</p><hr class=\"docutils\"><p>Вы размещаете щит, чтобы защищаться.\nКогда вы \"Подняли щит\", вы получаете его бонус обстоятельства к КБ.\nЩит остается поднятым до начала вашего следующего хода.</p>",
      "src": "",
      "originalName": "Raise a Shield",
      "action": "одиночное действие",
      "id": "action-raise-a-shield"
  },
  {
      "fullName": "Указать (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=97\">Point Out</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Указать",
      "traits": [
          "воздействие",
          "слуховой",
          "визуальный"
      ],
      "rarity": "",
      "desc": "<span id=\"action-point-out\"></span><p><strong>Требования</strong>: Существо <span class=\"c-undetected\">необнаружено</span> для одного или более союзника, но не <span class=\"c-undetected\">необнаружено</span> вами</p><hr class=\"docutils\"><p>Вы показываете на существо, которое вы видите, одному или более союзникам, жестом указывая направление и словесно описывая расстояние.\nЭто существо <span class=\"c-hidden\">спрятано</span> для ваших союзников вместо того, чтобы быть <span class=\"c-undetected\">необнаруженным</span> (см. <a class=\"reference internal\" href=\"#ch9-detecting-creatures\"><span class=\"std std-ref\">Обнаружение существ (Detecting Creatures)</span></a>).\nЭто действует только на союзников, которые могут видеть вас и в месте где они могут обнаружить цель.\nЕсли ваши союзники не могут слышать или понимать вас, они должны совершить успешную проверку Восприятия против КС Скрытности существа, иначе они неверно поймут и посчитают, что цель в другом месте.</p>",
      "src": "",
      "originalName": "Point Out",
      "action": "одиночное действие",
      "id": "action-point-out"
  },
  {
      "fullName": "Лететь (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=94\">Fly</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Лететь",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-fly\"></span><p><strong>Требования</strong>: У вас есть Скорость полета</p><hr class=\"docutils\"><p>Вы двигаетесь по воздуху на расстояние вплоть до Скорости полета.\nДвижение вверх (прямо или по диагонали) использует правила передвижения по сложной местности (см. <a class=\"reference internal\" href=\"#ch9-difficult-terrain\"><span class=\"std std-ref\">Сложная местность (Difficult Terrain)</span></a>).\nВы можете двигаться ровно вниз на 10 футов, за каждые потраченные 5 футов.\nЕсли вы Летите до земли, то не получаете урона от падения.\nВы можете использовать действие Лететь, чтобы пролететь 0 футов, и тем самым зависнуть на месте.\nЕсли к окончанию своего хода вы находитесь в воздухе и в этом раунде не использовали действие Лететь, то вы <a class=\"reference internal\" href=\"#ch9-falling\"><span class=\"std std-ref\">падаете</span></a>.</p>",
      "src": "",
      "originalName": "Fly",
      "action": "одиночное действие",
      "id": "action-fly"
  },
  {
      "fullName": "Рыть (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=93\">Burrow</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Рыть",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-burrow\"></span><p><strong>Требования</strong>: У вас есть Скорость рытья</p><hr class=\"docutils\"><p>Вы прокапываете путь через грязь, песок, или подобный рыхлый материал, с вашей Скоростью рытья.\nВы не можете рыть через камни или другие субстанции, более плотные чем грязь/почва, если только у вас нет умения позволяющего так делать.</p>",
      "src": "",
      "originalName": "Burrow",
      "action": "одиночное действие",
      "id": "action-burrow"
  },
  {
      "fullName": "Отвести взгляд (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=92\">Avert Gaze</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Отвести взгляд",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-avert-gaze\"></span><p>Вы отводите взгляд от опасности.\nВы получаете бонус обстоятельства +2 к спасброскам против <span class=\"t-visual\">визуальных</span> умений, которые требуют от вас смотреть на существо или объект, как например взгляд медузы, превращающий в камень.\nВаш взгляд остается отвернутым до начала вашего следующего хода.</p>",
      "src": "",
      "originalName": "Avert Gaze",
      "action": "одиночное действие",
      "id": "action-avert-gaze"
  },
  {
      "fullName": "Оседлать (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=96\">Mount</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Оседлать",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-mount\"></span><p><strong>Требования</strong>: Вы рядом с существом, которое как минимум на размер больше вас и готово быть вашим ездовым животным</p><hr class=\"docutils\"><p>Вы взбираетесь на существо и седлаете его.\nЕсли вы уже верхо́м, то можете использовать это действие, чтобы спешиться, передвинув ездовое животное в смежное пространство.</p>",
      "src": "",
      "originalName": "Mount",
      "action": "одиночное действие",
      "id": "action-mount"
  },
  {
      "fullName": "Поддержание активации (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=99\">Sustain an Activation</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Поддержание активации",
      "traits": [
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-sustain-an-activation\"></span><p><strong>Требования</strong>: У вас есть хотя бы одна активация магического предмета, которую вы можете поддерживать и вы не имеет состояние <span class=\"c-fatigued\">утомлен</span>.</p><hr class=\"docutils\"><p>Выберите одну действующую активацию вашего магического предмета с поддерживаемой продолжительностью.\nПродолжительность этой активации продолжается до конца вашего следующего хода.\nНекоторые активации могут иметь немного другие или расширенные эффекты, если вы поддерживаете их.\n\"Поддержание активации\" более чем 10 минут (100 раундов) завершает активацию и вы получаете состояние <span class=\"c-fatigued\">утомлен</span>, если только описание предмена не гласит о иной максимальной продолжительности (например \"вплоть до 1 минуты\" или \"вплоть до 1 часа\").</p><p>Если ваше действие \"Поддержание активации\" прервано, то эффект предмета мгновенно заканчивается.</p>",
      "src": "",
      "originalName": "Sustain an Activation",
      "action": "одиночное действие",
      "id": "action-sustain-an-activation"
  },
  {
      "fullName": "Меткость автоматона (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=903\">Automaton Aim</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Меткость автоматона",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-automaton-automaton-aim\"></span><p><strong>Источник</strong>: Guns &amp; Gears pg. 39</p><p>Вы придаете устойчивость своему телу и наблюдаете за событиями на поле боя, чтобы максимизировать дальность своего следующего выстрела.\nВы снижаете штраф за стрельбу во 2-м шаге дистанции вашего оружия с -2 до 0, для своей следующей дистанционной атаки в этом ходу.\nВы можете использовать это действие второй раз в тот же ход, для следующей дистанционной атаки в этом ходу, чтобы уменьшить штраф за стрельбу в 3-м шаге дистанции вашего оружия с -4 до 0.</p>",
      "src": "",
      "originalName": "Automaton Aim",
      "action": "одиночное действие",
      "id": "action-automaton-automaton-aim"
  },
  {
      "fullName": "Отклонение корпусом (Chassis Deflection) <img alt=\"реакция\" class=\"action action-reaction\" src=\"PF_action_reaction.webp\" style=\"height: 1em;\">",
      "name": "Отклонение корпусом",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-automaton-chassis-deflection\"></span><p><strong>Триггер</strong>: Вам наносится урон критическим попаданием</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 40</p><hr class=\"docutils\"><p>Совершите чистую проверку КС 17.\nВ случае успеха, атака становится обычным попаданием.</p>",
      "src": "",
      "originalName": "Chassis Deflection",
      "action": "реакция",
      "id": "action-automaton-chassis-deflection"
  },
  {
      "fullName": "Сопротивляться магии (Resist Magic) <img alt=\"реакция\" class=\"action action-reaction\" src=\"PF_action_reaction.webp\" style=\"height: 1em;\">",
      "name": "Сопротивляться магии",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-automaton-resist-magic\"></span><p><strong>Триггер</strong>: Вы совершаете спасбросок против вредящего магического эффекта, но еще не сделали бросок</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 41</p><hr class=\"docutils\"><p>Вас защищает врожденная магия.\nВы получаете к спровоцировавшему спасброску бонус обстоятельства +1.\nТакже, если спровоцировавший эффект <span class=\"t-arcana\">арканный</span>, и при броске вы получаете успех, то вместо этого получаете критический успех.</p>",
      "src": "",
      "originalName": "Resist Magic",
      "action": "реакция",
      "id": "action-automaton-resist-magic"
  },
  {
      "fullName": "Поднять шею (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1450\">Raise Neck</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Поднять шею",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-nagaji-raise-neck\"></span><p><strong>Источник</strong>: Lost Omens: Impossible Lands pg. 48</p><p>Вы поднимаете свою голову в позицию для удара.\nУдар клыками, полученный от родословной нагаджи, получает досягаемость 10 футов до конца вашего хода.</p>",
      "src": "",
      "originalName": "Raise Neck",
      "action": "одиночное действие",
      "id": "action-nagaji-raise-neck"
  },
  {
      "fullName": "Отравить (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1451\">Envenom</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Отравить",
      "traits": [
          "воздействие"
      ],
      "rarity": "",
      "desc": "<span id=\"action-vishkanya-envenom\"></span><p><strong>Частота</strong>: раз в день</p><p><strong>Источник</strong>: Lost Omens: Impossible Lands pg. 59</p><hr class=\"docutils\"><p>Вы применяете свои врожденные токсины через слюну или кровь, чтобы нанести вишканский яд на свои оружие или единицу амуниции.\nЧтобы использовать свою кровь, вы должны быть ранены, или вы можете нанести себе 1 рубящего урона как часть этого действия.\nЯд вишканьи сохраняет свои свойства до конца вашего следующего хода или до тех пор, пока вы не потратите его так, как обычно расходуется яд <a class=\"reference internal\" href=\"../../crafting_and_treasure/alchemical_items.html#ch11-alchemical-poisons-method-of-exposure-injury\"><span class=\"std std-ref\">для ранений</span></a> - либо при попадании в цель, либо при критическом провале броска атаки.</p><p><strong>Слабый яд вишканьи (Minor Vishkanyan Venom)</strong>\n(<span class=\"t-injury\">ранение</span>, <span class=\"t-poison\">яд</span>)</p><div class=\"line-block\">\n<div class=\"line\"><strong>Спасбросок</strong>: Стойкость</div>\n<div class=\"line\"><strong>Макс.продолжительность</strong>: 6 раундов</div>\n<div class=\"line\"><strong>Стадия 1</strong>: 1d4 урона ядом (1 раунд)</div>\n<div class=\"line\"><strong>Стадия 2</strong>: 1d4 урона ядом (1 раунд)</div>\n<div class=\"line\"><strong>Стадия 3</strong>: 1d4 урона ядом (1 раунд)</div>\n</div>",
      "src": "",
      "originalName": "Envenom",
      "action": "одиночное действие",
      "id": "action-vishkanya-envenom"
  },
  {
      "fullName": "Отравляющий выхват (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1452\">Venom Draw</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Отравляющий выхват",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-vishkanya-venom-draw\"></span><p><strong>Требования</strong>: Ваше действие <a class=\"reference internal\" href=\"#action-vishkanya-envenom\"><span class=\"std std-ref\">Отравить (Envenom) </span></a> не израсходовано</p><p><strong>Источник</strong>: Lost Omens: Impossible Lands pg. 60</p><hr class=\"docutils\"><p>Вы быстро наносите ядовитую слюну на свое оружие, когда достаете его.\n<a class=\"reference internal\" href=\"../../playing_the_game.html#action-interact\"><span class=\"std std-ref\">Взаимодействуйте (Interact)</span></a>, чтобы достать оружие, а затем <a class=\"reference internal\" href=\"#action-vishkanya-envenom\"><span class=\"std std-ref\">Отравить (Envenom)</span></a> его.\nНа это расходуется ваше ежедневное использование действия Отравления.</p>",
      "src": "",
      "originalName": "Venom Draw",
      "action": "одиночное действие",
      "id": "action-vishkanya-venom-draw"
  },
  {
      "fullName": "Пустой сосуд (Empty Vessel) <img alt=\"реакция\" class=\"action action-reaction\" src=\"PF_action_reaction.webp\" style=\"height: 1em;\">",
      "name": "Пустой сосуд",
      "traits": [
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-reflection-empty-vessel\"></span><p><strong>Частота</strong>: раз в день</p><p><strong>Триггер</strong>: Вы получите ментальный урон или будете подвержены <span class=\"t-mental\">ментальному</span> эффекту</p><p><strong>Источник</strong>: Dark Archive pg. 120</p><hr class=\"docutils\"><p>Вы получаете против спровоцировавшего эффекта бонус обстоятельства +2 к спасброскам Воли и сопротивление ментальному урону, равное вашему уровню.\nЭто применяется только к начальному эффекту, но не к последующим спасброскам, продолжительному ментальному урону или другим повторяющимся эффектам.</p>",
      "src": "",
      "originalName": "Empty Vessel",
      "action": "реакция",
      "id": "action-reflection-empty-vessel"
  },
  {
      "fullName": "Хитрость зеркала (Mirror's Trickery) <img alt=\"реакция\" class=\"action action-reaction\" src=\"PF_action_reaction.webp\" style=\"height: 1em;\">",
      "name": "Хитрость зеркала",
      "traits": [
          "оккультный",
          "иллюзия",
          "визуальный",
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-reflection-mirrors-trickery\"></span><p><strong>Частота</strong>: раз в день</p><p><strong>Триггер</strong>: По вам попадут <a class=\"reference internal\" href=\"../../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударом (Strike)</span></a></p><p><strong>Источник</strong>: Dark Archive pg. 120</p><hr class=\"docutils\"><p>Вы в последний миг создаете иллюзорный дубликат и пытаетесь обхитрить своего противника, чтобы он ударил его, а не вас.\nАтакующий совершает чистую проверку КС 11; при провале, атака попадает по дубликату, изменяя результат с критического успеха на обычный успех, либо с успеха на провал.</p>",
      "src": "",
      "originalName": "Mirror's Trickery",
      "action": "реакция",
      "id": "action-reflection-mirrors-trickery"
  },
  {
      "fullName": "Ярость (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=3\">Rage</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Ярость",
      "traits": [
          "концентрация",
          "эмоция",
          "ментальный",
          "варвар"
      ],
      "rarity": "",
      "desc": "<span id=\"action-barbarian-rage\"></span><p><strong>Требования</strong>: Вы не в ярости или не имеет состояние <span class=\"c-fatigued\">утомлен</span></p><hr class=\"docutils\"><p>Вы обращаетесь к своему внутреннему гневу и начинаете бушевать.\nВы получаете временные ОЗ в количестве, равном вашему уровню + модификатор Телосложения.\nЭта ярость длится 1 минуту, пока не останется врагов, которых вы можете ощущать, или пока вы не потеряете сознание, в зависимости от того, что произойдет раньше.\nКогда вы в ярости:</p><ul class=\"simple\">\n<li><p>Вы наносите 2 дополнительного урона <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударами (Strikes)</span></a> ближнего боя. Этот дополнительный урон делится пополам, если ваше оружие или безоружная атака имеет признак <span class=\"w-agile\">быстрое</span>.</p></li>\n<li><p>Вы получаете штраф -1 к КБ</p></li>\n<li><p>Вы не можете использовать действия с признаком <span class=\"t-concentrate\">концентрация</span>, кроме тех, у которых еще есть признак <span class=\"t-rage\">ярость</span>. Во время ярости вы можете использовать <a class=\"reference internal\" href=\"../playing_the_game.html#action-seek\"><span class=\"std std-ref\">Поиск (Seek) </span></a>.</p></li>\n</ul><p>После прекращения ярости, вы теряете любые временные ОЗ оставшиеся от \"Ярости\" и не можете впадать в нее снова в течение 1 минуты.</p>",
      "src": "",
      "originalName": "Rage",
      "action": "одиночное действие",
      "id": "action-barbarian-rage"
  },
  {
      "fullName": "Выслеживать добычу (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=10\">Hunt Prey</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Выслеживать добычу",
      "traits": [
          "концентрация",
          "рейнджер"
      ],
      "rarity": "",
      "desc": "<span id=\"action-ranger-hunt-prey\"></span><p>Вы определяете одно существо как свою добычу и фокусируете на нем свои атаки.\nВы должны быть в состоянии видеть или слышать добычу, или вы должны выслеживать добычу во время исследования.</p><p>Вы получаете бонус обстоятельства +2 к проверкам Восприятия, когда осуществляете <a class=\"reference internal\" href=\"../playing_the_game.html#action-seek\"><span class=\"std std-ref\">Поиск (Seek) </span></a> добычи, и бонус обстоятельства +2 к проверкам Выживания когда <a class=\"reference internal\" href=\"../skills.html#skill-survival-track\"><span class=\"std std-ref\">Выслеживаете (Track)</span></a> добычу.\nЕще вы игнорируете штраф дистанционных атак по добыче в пределах 2-го шага дистанции.</p><p>Вы единовременно можете определить только 1 существо в качестве своей добычи.\nЕсли вы используете \"Выслеживать добычу\" на существо, в то время, когда у вас уже есть выбранная цель, прежнее существо теряет это обозначение, а новое получает.\nВаш выбор добычи длится до следующих дневных приготовлений.</p>",
      "src": "",
      "originalName": "Hunt Prey",
      "action": "одиночное действие",
      "id": "action-ranger-hunt-prey"
  },
  {
      "fullName": "Шквал ударов (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=9\">Flurry of Blows</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Шквал ударов",
      "traits": [
          "размах",
          "монах"
      ],
      "rarity": "",
      "desc": "<span id=\"action-monk-flurry-of-blows\"></span><p>Совершите два безоружных <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удара (Strikes)</span></a>.\nЕсли оба попадают по одному существу, объедините урон, для преодоления сопротивлений и использования слабостей.\nПрименяйте свой штраф множественной атаки к <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударам (Strikes)</span></a> как обычно.\nТак как действие имеет признак <span class=\"t-flourish\">размах</span>, вы можете использовать \"Шквал ударов\" только раз за ход.</p>",
      "src": "",
      "originalName": "Flurry of Blows",
      "action": "одиночное действие",
      "id": "action-monk-flurry-of-blows"
  },
  {
      "fullName": "Ослабляющий удар (Debilitating Strike) <img alt=\"свободное действие\" class=\"action action-free\" src=\"/PF_action_free.webp\" style=\"height: 1em;\">",
      "name": "Ослабляющий удар",
      "traits": [
          "плут"
      ],
      "rarity": "",
      "desc": "<span id=\"action-rogue-debilitating-strike\"></span><p><strong>Триггер</strong>: Ваш <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike) </span></a> попадает по <span class=\"c-flat-footed\">застигнутому врасплох</span> врагу и наносит урон</p><hr class=\"docutils\"><p>Вы применяете одно из следующих ослаблений, которое длится до конца вашего следующего хода.</p><ul class=\"simple\">\n<li><p><strong>Ослабление</strong>: Цель получает штраф состояния -10 футов к Скоростям.</p></li>\n<li><p><strong>Ослабление</strong>: Цель получает состояние <span class=\"c-enfeebled\">ослаблен 1</span>.</p></li>\n</ul>",
      "src": "",
      "originalName": "Debilitating Strike",
      "action": "свободное действие",
      "id": "action-rogue-debilitating-strike"
  },
  {
      "fullName": "Мастерский удар (Master Strike) <img alt=\"свободное действие\" class=\"action action-free\" src=\"/PF_action_free.webp\" style=\"height: 1em;\">",
      "name": "Мастерский удар",
      "traits": [
          "недееспособность",
          "плут"
      ],
      "rarity": "",
      "desc": "<span id=\"action-rogue-master-strike\"></span><p><strong>Триггер</strong>: Ваш <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike) </span></a> попадает по <span class=\"c-flat-footed\">застигнутому врасплох</span> существу и наносит урон</p><hr class=\"docutils\"><p>Цель совершает спасбросок Стойкости с вашим КС класса.\nПотом она становится временно иммунна к вашему \"Мастерскому удару\" на 1 день.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Цель невредима.</div>\n<div class=\"line\"><strong>Успех</strong>: Цель получает состояние <span class=\"c-enfeebled\">ослаблен 2</span> до конца вашего следующего хода.</div>\n<div class=\"line\"><strong>Провал</strong>: Цель получает состояние <span class=\"c-paralyzed\">парализован</span> на 4 раунда.</div>\n<div class=\"line\"><strong>Критический провал</strong>: Цель получает состояние <span class=\"c-paralyzed\">парализован</span> на 4 раунда, теряет сознание на 2 часа, или убита (на ваш выбор).</div>\n</div>",
      "src": "",
      "originalName": "Master Strike",
      "action": "свободное действие",
      "id": "action-rogue-master-strike"
  },
  {
      "fullName": "Уверенный финишер (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=550\">Confident Finisher</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Уверенный финишер",
      "traits": [
          "финишер",
          "сорвиголова"
      ],
      "rarity": "",
      "desc": "<span id=\"action-swashbuckler-confident-finisher\"></span><p>Вы делаете невероятно грациозную атаку, пробивая защиту врага.\nСделайте <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike) </span></a> оружием или безоружной атакой, которая может применить урон от вашего <a class=\"reference internal\" href=\"#class-feature-swashbuckler-precise-strike\"><span class=\"std std-ref\">точного удара (precise strike)</span></a>.\nЭтот удар имеет эффект провала.</p><p><strong>Провал</strong>: Вы наносите цели половину своего урона от точного удара.\nУрон от этого Удара имеет тот же тип, что и оружие или безоружная атака, которую вы использовали.</p>",
      "src": "",
      "originalName": "Confident Finisher",
      "action": "одиночное действие",
      "id": "action-swashbuckler-confident-finisher"
  },
  {
      "fullName": "Перезаряжающий удар (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=906\">Reloading Strike</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Перезаряжающий удар",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-reloading-strike\"></span><p><strong>Требования</strong>: Вы владеете огнестрельным оружием или арбалетом в одной руке, а другая рука пуста, либо владеет одноручным оружием ближнего боя</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 108</p><hr class=\"docutils\"><p>Вы совершаете атаку ближнего боя, а затем одним плавным движением перезаряжаете свое огнестрельное оружие.\n<a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударьте (Strike)</span></a> оппонента в пределах досягаемости своим одноручным оружием ближнего боя (или безоружной атакой, если рука пуста) и затем <a class=\"reference internal\" href=\"../playing_the_game.html#action-interact\"><span class=\"std std-ref\">Взаимодействуйте (Interact)</span></a> для перезарядки.\nДля такого способа перезарядки вам не требуется свободная рука.</p>",
      "src": "",
      "originalName": "Reloading Strike",
      "action": "одиночное действие",
      "id": "action-gunslinger-reloading-strike"
  },
  {
      "fullName": "Завершить начатое (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=908\">Finish The Job</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Завершить начатое",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-finish-the-job\"></span><p><strong>Требования</strong>: Своим последним действием вы провалили (но не критически) <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Выстрел (Strike)</span></a> огнестрельным оружием или арбалетом, которым владеете одной рукой, а другая рука пуста, либо владеет оружием ближнего боя</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 108</p><hr class=\"docutils\"><p>Ваша последняя атака была неудачной, но она готовит вас к еще одной.\nСовершите <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike) </span></a> другой рукой, используя одноручное оружие ближнего боя или безоружную атаку.\nЭтот Удар использует такой же штраф множественной атаки, что и проваленный прошлым действием.\nПосле этого, увеличьте свой штраф множественной атаки как обычно.</p>",
      "src": "",
      "originalName": "Finish The Job",
      "action": "одиночное действие",
      "id": "action-gunslinger-finish-the-job"
  },
  {
      "fullName": "Пробуждение скитальца (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=909\">Drifter's Wake</a>) <img alt=\"активность из 3-х действий\" class=\"action action-3\" src=\"/PF_action_3.webp\" style=\"height: 1em;\">",
      "name": "Пробуждение скитальца",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-drifters-wake\"></span><p><strong>Источник</strong>: Guns &amp; Gears pg. 109</p><hr class=\"docutils\"><p>Вы проноситесь по полю боя, по ходу разя своих противников.\nВы <a class=\"reference internal\" href=\"../playing_the_game.html#action-stride\"><span class=\"std std-ref\">Перемещаетесь (Stride)</span></a> и можете <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударить (Strike)</span></a> вплоть до 3 раз в любой момент своего движения.\nКаждая атака должна целиться в другого врага и быть совершена одноручным огнестрельным оружием, арбалетом, оружием ближнего боя или безоружной атакой.\nКаждая атака считается к вашему штрафу множественной атаки, но он не увеличивается пока вы не закончите все эти атаки.\nВаше перемещение не провоцирует реакции.</p>",
      "src": "",
      "originalName": "Drifter's Wake",
      "action": "активность из 3-х действий",
      "id": "action-gunslinger-drifters-wake"
  },
  {
      "fullName": "Перезарядка балагура (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=910\">Raconteur's Reload</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Перезарядка балагура",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-raconteurs-reload\"></span><p><strong>Источник</strong>: Guns &amp; Gears pg. 109</p><hr class=\"docutils\"><p>Ваши быстрые или действенные слова отвлекают внимание противника от ваших рук на столько, чтобы успеть сделать еще выстрел.\n<a class=\"reference internal\" href=\"../playing_the_game.html#action-interact\"><span class=\"std std-ref\">Взаимодействуйте (Interact)</span></a> для перезарядки а затем сделайте проверку Обмана, чтобы <a class=\"reference internal\" href=\"../skills.html#skill-deception-create-a-diversion\"><span class=\"std std-ref\">Отвлечь внимание (Create a Diversion) </span></a> или проверку Запугивания, чтобы <a class=\"reference internal\" href=\"../skills.html#skill-intimidation-demoralize\"><span class=\"std std-ref\">Деморализовать (Demoralize) </span></a>.</p>",
      "src": "",
      "originalName": "Raconteur's Reload",
      "action": "одиночное действие",
      "id": "action-gunslinger-raconteurs-reload"
  },
  {
      "fullName": "Мрачное самодовольство (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=913\">Grim Swagger</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Мрачное самодовольство",
      "traits": [
          "страх",
          "слуховой",
          "языковой",
          "эмоция",
          "ментальный",
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-grim-swagger\"></span><p><strong>Требования</strong>: Вы открыто носите или владеете одноручным огнестрельным оружием или одноручным арбалетом</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 109</p><hr class=\"docutils\"><p>Вы пытаетесь очистить комнату, обещая мрачную участь каждому, кто сейчас же не сделает то, что вы говорите.\nСовершите проверку Обмана или Запугивания против КС Воли каждого существа в пределах 30 футов, кроме ваших союзников.\nВне зависимости от вашего успеха или провала, каждый субъект временно иммунен к вашему \"Мрачному самодовольству\" на 10 минут.</p><p>Например, если вы делаете проверку Обмана, то лжете и хвастаете своим мастерством или идущей сюда большой группой друзей.\nЕсли вы делаете проверку Запугивания, то обещаете всем в комнате, что вы будете последним, что они увидели на этом свете.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Существо становится <span class=\"c-frightened\">напугано 3</span>. Если оно ниже вас по уровню, то оно еще <span class=\"c-fleeing\">убегает</span> 1 раунд.</div>\n<div class=\"line\"><strong>Успех</strong>: Существо становится <span class=\"c-frightened\">напугано 2</span>.</div>\n</div>",
      "src": "",
      "originalName": "Grim Swagger",
      "action": "активность из 2-х действий",
      "id": "action-gunslinger-grim-swagger"
  },
  {
      "fullName": "Перезарядка в укрытии (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=914\">Covered Reload</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Перезарядка в укрытии",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-covered-reload\"></span><p><strong>Источник</strong>: Guns &amp; Gears pg. 109</p><hr class=\"docutils\"><p>Вы пригибаетесь в безопасное положение или сводите к минимуму свой силуэт во время перезарядки, чтобы совершить следующую атаку.\nЛибо <a class=\"reference internal\" href=\"../playing_the_game.html#action-take-cover\"><span class=\"std std-ref\">Укройтесь (Take Cover)</span></a>, либо <a class=\"reference internal\" href=\"../skills.html#skill-stealth-hide\"><span class=\"std std-ref\">Спрячьтесь (Hide)</span></a>, после чего <a class=\"reference internal\" href=\"../playing_the_game.html#action-interact\"><span class=\"std std-ref\">Взаимодействуйте (Interact)</span></a> для перезарядки.\nВы должны соответствовать требованиям Укрыться и Спрятаться, как обычно;\nвы должны лежать <span class=\"c-prone\">ничком</span>, получать преимущества от укрытия, или быть рядом с особенностью, которая позволяет Укрыться, а чтобы Спрятаться, вам надо получать преимущества от укрытия, либо быть <span class=\"c-concealed\">скрытым</span> от этого существа.</p>",
      "src": "",
      "originalName": "Covered Reload",
      "action": "одиночное действие",
      "id": "action-gunslinger-covered-reload"
  },
  {
      "fullName": "Роковой выстрел (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=916\">Vital Shot</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Роковой выстрел",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-vital-shot\"></span><p><strong>Источник</strong>: Guns &amp; Gears pg. 110</p><hr class=\"docutils\"><p>Ваш меткий выстрел в ничего не подозревающего противника пробивает жизненно важную артерию или орган.\nСовершите дистанционный <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike) </span></a>.\nЕсли цель <span class=\"c-flat-footed\">застигнута врасплох</span>, то этот Удар наносит дополнительную кость урона оружия и враг получает продолжительный урон кровотечением, равный точному урону от <a class=\"reference internal\" href=\"#action-gunslinger-one-shot-one-kill\"><span class=\"std std-ref\">Один выстрел - один труп (One Shot, One Kill) </span></a>.</p>",
      "src": "",
      "originalName": "Vital Shot",
      "action": "активность из 2-х действий",
      "id": "action-gunslinger-vital-shot"
  },
  {
      "fullName": "Призрачный выстрел (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=917\">Ghost Shot</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Призрачный выстрел",
      "traits": [
          "размах",
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-ghost-shot\"></span><p><strong>Источник</strong>: Guns &amp; Gears pg. 110</p><hr class=\"docutils\"><p>Совершите <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Выстрел (Strike)</span></a> из огнестрельного оружия или арбалета.\nЕсли вы <span class=\"c-hidden\">спрятаны</span> от цели или <span class=\"c-undetected\">необнаружены</span> ею, этот Выстрел добавляет дополнительный точный урон от <a class=\"reference internal\" href=\"#action-gunslinger-one-shot-one-kill\"><span class=\"std std-ref\">Один выстрел - один труп (One Shot, One Kill) </span></a>;\nесли вы уже получите этот дополнительный урон при этом Выстреле, то эти эффекты не складываются.\nЕсли вы были <span class=\"c-undetected\">необнаружены</span> или <span class=\"c-unnoticed\">незамечены</span> любыми существами, то теперь вы вместо этого <span class=\"c-hidden\">спрятаны</span> от них, так как понятно место, из которого произошла атака.</p>",
      "src": "",
      "originalName": "Ghost Shot",
      "action": "одиночное действие",
      "id": "action-gunslinger-ghost-shot"
  },
  {
      "fullName": "Расчистить путь (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=918\">Clear a Path</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Расчистить путь",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-clear-a-path\"></span><p><strong>Требования</strong>: Вы владеете двуручным огнестрельным оружием или двуручным арбалетом</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 110</p><hr class=\"docutils\"><p>Вы расталкиваете оружием, чтобы расчистить пространство, а затем быстро перезаряжаете.\nВы совершаете проверку Атлетики, чтобы <a class=\"reference internal\" href=\"../skills.html#skill-athletics-shove\"><span class=\"std std-ref\">Толкнуть (Shove) </span></a> оппонента в пределах досягаемости используя оружие, а потом <a class=\"reference internal\" href=\"../playing_the_game.html#action-interact\"><span class=\"std std-ref\">Взаимодействуете (Interact)</span></a> чтобы перезарядить.\nДля этого Толчка вам не нужна свободная рука и вы добавляете к проверке Атлетики бонус предмета оружия к броску атаки (если есть).\nЕсли ваше последнее действие было дистанционным <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Выстрелом (Strike)</span></a> этим оружием, используйте для Толчка тот же штраф множественной атаки, что и для того Выстрела;\nТолчок все еще считается к вашему штрафу множественной атаки для дальнейших атак, как обычно.</p>",
      "src": "",
      "originalName": "Clear a Path",
      "action": "одиночное действие",
      "id": "action-gunslinger-clear-a-path"
  },
  {
      "fullName": "Вращающееся сокрушение (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=920\">Spinning Crush</a>) <img alt=\"активность из 3-х действий\" class=\"action action-3\" src=\"/PF_action_3.webp\" style=\"height: 1em;\">",
      "name": "Вращающееся сокрушение",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-spinning-crush\"></span><p><strong>Требования</strong>: Вы владеете заряжаемым огнестрельным оружием или заряженным арбалетом</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 110</p><hr class=\"docutils\"><p>Вы начинаете злобно вращаться, избивая своим оружием тех, кто находится поблизости, и увеличивая инерцию за счет стрельбы.\nВсе существа рядом с вами получают 1d6 дробящего урона + ваш модификатор Силы;\nон увеличивается до 2d6, если у оружия есть <a class=\"reference internal\" href=\"../crafting_and_treasure/runes.html#item-striking\"><span class=\"std std-ref\">Разящая (Striking) / Руна 4+</span></a>, 3d6 для <em>отличной разящей</em> и 4d6 для <em>старшей разящей</em>.\nЭто умение не применяет другие эффекты, увеличивающие урон вашими огнестрельными <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударами (Strikes)</span></a>, как например <a class=\"reference internal\" href=\"#class-feature-gunslinger-weapon-specialization\"><span class=\"std std-ref\">Специализация в оружии (Weapon Specialization) / 7-й</span></a>.\nСущества задетые этой атакой должны совершить простой спасбросок Рефлекса.\nСущество провалившее свой спасбросок еще отталкивается от вас на 5 футов по прямой.</p>",
      "src": "",
      "originalName": "Spinning Crush",
      "action": "активность из 3-х действий",
      "id": "action-gunslinger-spinning-crush"
  },
  {
      "fullName": "Осадный разрушитель (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=921\">Siegebreaker</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Осадный разрушитель",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-siegebreaker\"></span><p><strong>Требования</strong>: Вы владеете огнестрельным оружием с признаком <span class=\"w-kickback\">отдача</span> или <span class=\"w-scatter\">разброс</span>, либо двуручным арбалетом</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 110</p><hr class=\"docutils\"><p>Вы разгоняетесь с невероятной силой и врезаетесь оружием в цель, перед тем, как упереться в землю пятками и нажать на курок.\n<a class=\"reference internal\" href=\"../playing_the_game.html#action-leap\"><span class=\"std std-ref\">Прыгните (Leap)</span></a> или <a class=\"reference internal\" href=\"../playing_the_game.html#action-stride\"><span class=\"std std-ref\">Переместитесь (Stride)</span></a>, затем <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Выстрелите (Strike)</span></a> требуемым огнестрельным оружием или арбалетом по цели в соседнем квадрате.\nЭтот Выстрел наносит дополнительные 3d8 дробящего урона и игнорирует 10 очков Твердости у цели (если есть) или Твердости щита, если цель использует <a class=\"reference internal\" href=\"../feats.html#feat-shield-block\"><span class=\"std std-ref\">Блок щитом (Shield Block)  / 1</span></a>.</p><p>После этого Выстрела, вы становитесь <span class=\"c-immobilized\">обездвижены</span> и оборонительно выставляете требуемое оружие, получая бонус обстоятельства +1 к КБ, или бонус обстоятельства +2 если оружие имеет признак <span class=\"w-parry\">парирование</span>.\nОба эффекта длятся до начала вашего следующего хода.\nЕсли какая-либо сила будет двигать вас, пока вы <span class=\"c-immobilized\">обездвижены</span> таким образом, она должна успешно совершить подходящую проверку против вашего КС класса.</p>",
      "src": "",
      "originalName": "Siegebreaker",
      "action": "активность из 2-х действий",
      "id": "action-gunslinger-siegebreaker"
  },
  {
      "fullName": "На волоске (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1454\">Touch and Go</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "На волоске",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-touch-and-go\"></span><p><strong>Требования</strong>: Вы владеете <span class=\"w-combination\">комбинированным</span> оружием</p><p><strong>Источник</strong>: Lost Omens: Impossible Lands pg. 108</p><hr class=\"docutils\"><p>Тени вашего тела скрывают сталь ваших рук.\nВы можете <a class=\"reference internal\" href=\"../playing_the_game.html#action-step\"><span class=\"std std-ref\">Шагнуть (Step)</span></a> к врагу, вы можете <a class=\"reference internal\" href=\"../playing_the_game.html#action-interact\"><span class=\"std std-ref\">Взаимодействовать (Interact) </span></a>, чтобы переключить оружие между режимами ближнего или дальнего боя, а затем вы <a class=\"reference internal\" href=\"../playing_the_game.html#action-interact\"><span class=\"std std-ref\">Взаимодействуете (Interact)</span></a> для перезарядки.</p>",
      "src": "",
      "originalName": "Touch and Go",
      "action": "одиночное действие",
      "id": "action-gunslinger-touch-and-go"
  },
  {
      "fullName": "Развести (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1456\">Wind them Up</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Развести",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-wind-them-up\"></span><p><strong>Источник</strong>: Lost Omens: Impossible Lands pg. 108</p><hr class=\"docutils\"><p>Следует ли врагам парировать ваш клинок или уклоняться от ваших пуль?\nНи то, ни другое - они должны следить за своим кошельком.\nНанесите <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike) </span></a> ближнего боя своим <span class=\"w-combination\">комбинированным</span> оружием, а затем совершите проверку Воровства со штрафом -5, чтобы <a class=\"reference internal\" href=\"../skills.html#skill-thievery-steal\"><span class=\"std std-ref\">Украсть (Steal) </span></a> у своей цели; вы не можете Украсть тщательно охраняемые объекты или объекты, на кражу которых уйдет много времени.\nЧтобы попытаться украсть что-то таким образом вам не нужна свободная рука.\nЕсли ваша проверка Воровства успешна, то цель <span class=\"c-flat-footed\">застигнута врасплох</span> против ваших дистанционных атак до начала вашего следующего хода, и вы не провоцируете реакции, которые обычно срабатывают при передвижении или дистанционной атаке.\nЭти эффекты действуют, даже если у цели нет предметов которые можно Украсть.</p>",
      "src": "",
      "originalName": "Wind them Up",
      "action": "активность из 2-х действий",
      "id": "action-gunslinger-wind-them-up"
  },
  {
      "fullName": "Сломить (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1457\">Break Them Down</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Сломить",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gunslinger-break-them-down\"></span><p><strong>Источник</strong>: Lost Omens: Impossible Lands pg. 108</p><hr class=\"docutils\"><p>Ваши враги - всего лишь отбросы, из которых вы высекаете и создаете свою легенду.\nНанесите <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike) </span></a> ближнего боя, а затем дистанционный Удар <span class=\"w-combination\">комбинированным</span> оружием, оба по одному и тому же врагу; для этого вам не нужно менять режим.\nЕсли этот Удар ближнего боя попадает, то вы получаете бонус обстоятельства +1 к данному дистанционному броску атаки.\nКаждая атака учитывается к штрафу множественной атаки, но он не увеличивается, пока вы не совершите обе атаки.\nЕсли оба Удара попадают, вы наносите противнику дополнительные 2d6 продолжительного урона кровотечением, и он <span class=\"c-dazzled\">ослеплен</span> пока не закончится этот продолжительный урон кровотечением.</p>",
      "src": "",
      "originalName": "Break Them Down",
      "action": "активность из 2-х действий",
      "id": "action-gunslinger-break-them-down"
  },
  {
      "fullName": "Быстрая алхимия (Quick Alchemy) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Быстрая алхимия",
      "traits": [
          "воздействие",
          "алхимик"
      ],
      "rarity": "",
      "desc": "<span id=\"action-alchemist-quick-alchemy\"></span><p><strong>Стоимость</strong>: 1 порция насыщенных реагентов</p><p><strong>Требования</strong>: У вас есть формула создаваемого алхимического предмета, и вы либо держите, либо имеете надетый <a class=\"reference internal\" href=\"../appendix/equipment_description.html#item-alchemists-tools\"><span class=\"std std-ref\">Набор алхимика (Alchemist`s tools)</span></a></p><hr class=\"docutils\"><p>Вы быстро смешиваете недолговечный алхимический предмет, чтобы использовать его в любой момент.\nВы создаете 1 <span class=\"t-alchemical\">алхимический</span> <span class=\"t-consumable\">расходуемый</span> предмет уровня вашей продвинутой алхимии или ниже, который есть в вашей книге формул, не тратя обычной денежной стоимости алхимических реагентов и не совершая проверку Ремесла.\nЭтот предмет имеет признак <span class=\"t-infused\">насыщенный</span>, но он остается эффективным только до начала вашего следующего хода.</p><div class=\"versionchanged\">\n<p><span class=\"versionmodified changed\">Изменено в версии /errata-CR-r4: </span>Уточнение, что создается <span class=\"t-consumable\">расходуемый</span> алхимический предмет, во избежании взаимодействия с нерасходуемыми предметами.</p>\n</div>",
      "src": "",
      "originalName": "Quick Alchemy",
      "action": "одиночное действие",
      "id": "action-alchemist-quick-alchemy"
  },
  {
      "fullName": "Мутагенный флэшбэк (Mutagenic Flashback) <img alt=\"свободное действие\" class=\"action action-free\" src=\"/PF_action_free.webp\" style=\"height: 1em;\">",
      "name": "Мутагенный флэшбэк",
      "traits": [
          "алхимик"
      ],
      "rarity": "",
      "desc": "<span id=\"action-alchemist-mutagenic-flashback\"></span><p><strong>Частота</strong>: раз в день</p><hr class=\"docutils\"><p>Вы испытываете кратковременный всплеск мутагена.\nВыберите один мутаген, который вы употребили с последних ежедневных приготовлений.\nВы получаете эффекты этого мутагена на 1 минуту.</p>",
      "src": "",
      "originalName": "Mutagenic Flashback",
      "action": "свободное действие",
      "id": "action-alchemist-mutagenic-flashback"
  },
  {
      "fullName": "Придумать стратагему (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=546\">Devise a Stratagem</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Придумать стратагему",
      "traits": [
          "удача",
          "концентрация",
          "сыщик"
      ],
      "rarity": "",
      "desc": "<span id=\"action-investigator-devise-a-stratagem\"></span><p><strong>Частота</strong>: раз в раунд</p><p><strong>Источник</strong>: Advanced Player's Guide pg. 56</p><hr class=\"docutils\"><p>Вы оцениваете слабости противника в бою и используете их, чтобы сформулировать план атаки вашего врага.\nВыберите существо, которе вы можете видеть, и сделайте бросок d20.\nЕсли позднее в этом раунде вы <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударяете (Strike)</span></a> выбранное существо, то в качестве броска атаки своего Удара, вы должны использовать результат броска сделанного с \"Придумать стратагему\", вместо осуществления нового броска.\nВы делаете эту подстановку только для первого Удара по этому существу в этом раунде, не для любых последующих атак.</p><p>Когда вы делаете эту подмену, то еще можете добавить свой модификатор Интеллекта к броску атаки вместо модификатора Силы или Ловкости, с учетом того, что ваш Удар использует оружие ближнего боя с признаком <span class=\"w-agile\">быстрое</span> или <span class=\"w-finesse\">точное</span>, безоружную атаку с признаком <span class=\"w-agile\">быстрое</span> или <span class=\"w-finesse\">точное</span>, дистанционное оружие (которое должно иметь признак <span class=\"w-agile\">быстрое</span> или <span class=\"w-finesse\">точное</span>, если используется метательное оружие ближнего боя), или мягкую дубинку.</p><p>Если вам известно, что выбранное существо является субъектом дела, которое вы расследовать, то можете использовать эту способность свободным действием (<img alt=\"свободное действие\" class=\"action action-free\" src=\"/PF_action_free.webp\" style=\"height: 1em;\">).</p>",
      "src": "",
      "originalName": "Devise a Stratagem",
      "action": "одиночное действие",
      "id": "action-investigator-devise-a-stratagem"
  },
  {
      "fullName": "Быстрая настойка (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=547\">Quick Tincture</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Быстрая настойка",
      "traits": [
          "воздействие",
          "сыщик"
      ],
      "rarity": "",
      "desc": "<span id=\"action-investigator-quick-tincture\"></span><p><strong>Стоимость</strong>: 1 универсальный бутылек</p><p><strong>Требования</strong>: Вы знаете формулу создаваемого алхимического предмета, держите или носите на себе <a class=\"reference internal\" href=\"../appendix/equipment_description.html#item-alchemists-tools\"><span class=\"std std-ref\">Набор алхимика (Alchemist`s tools)</span></a> и у вас есть свободная рука</p><p><strong>Источник</strong>: Advanced Player's Guide pg. 57</p><hr class=\"docutils\"><p>Вы быстро смешиваете недолговременную настойку.\nВы создаете 1 алхимический эликсир или инструмент, уровень которого равен или меньше вашего, не тратя обычную денежную стоимость на алхимические реагенты или без необходимости совершать проверку Ремесла.\nЭтот предмет имеет признак <span class=\"t-infused\">насыщенный</span>, но остается действенным только до конца текущего хода.</p>",
      "src": "",
      "originalName": "Quick Tincture",
      "action": "одиночное действие",
      "id": "action-investigator-quick-tincture"
  },
  {
      "fullName": "Наводящий вопрос (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=549\">Pointed Question</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Наводящий вопрос",
      "traits": [
          "слуховой",
          "языковой",
          "ментальный",
          "концентрация",
          "сыщик"
      ],
      "rarity": "",
      "desc": "<span id=\"action-investigator-pointed-question\"></span><p><strong>Источник</strong>: Advanced Player's Guide pg. 58</p><hr class=\"docutils\"><p>Вы задаете вопрос, который правильном образом очаровывает или задевает кого-то.\nЗадайте вопрос существу, которое не является союзником, которое вы можете видеть и с которым можете общаться.\nСделайте проверку Дипломатии с КС Воли существа.\nПосле этого, существо временно иммунно на 1 час.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Цель должна прямо ответить на ваш вопрос. Она не обязана отвечать правдиво, но, если существо пытается <a class=\"reference internal\" href=\"../skills.html#skill-deception-lie\"><span class=\"std std-ref\">Лгать (Lie)</span></a> вам, то вы получаете бонус обстоятельства +4 к вашему КС Восприятия.</div>\n<div class=\"line\"><strong>Успех</strong>: Как крит.успех, но бонус обстоятельства +2</div>\n<div class=\"line\"><strong>Провал</strong>: Цель как обычно может отказаться ответить вам</div>\n<div class=\"line\"><strong>Критический провал</strong>: Цель как обычно может отказаться ответить вам, и из-за вашего надоедливого внимания ее отношение к вам снижается на одну ступень</div>\n</div>",
      "src": "",
      "originalName": "Pointed Question",
      "action": "одиночное действие",
      "id": "action-investigator-pointed-question"
  },
  {
      "fullName": "Перегрузка (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=901\">Overdrive</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Перегрузка",
      "traits": [
          "воздействие",
          "изобретатель"
      ],
      "rarity": "",
      "desc": "<span id=\"action-inventor-overdrive\"></span><p><strong>Частота</strong>: раз в раунд</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 16</p><hr class=\"docutils\"><p>Временно переключив штуковины на себе в режим перегрузки, вы пытаетесь придать бо́льшую силу своим атакам.\nСовершите проверку Ремесла, которая имеет стандартный КС для вашего уровня (см. <a class=\"reference internal\" href=\"../game_mastering/index.html#table-10-5-1\"><span class=\"std std-ref\">Таблица 10-5-1: КС по уровню (DCs by Level)</span></a>).</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Ваши штуковины входят в состояние невероятной эффективности, называемое критической перегрузкой, добавляя вашим атакам отличную мощь. На 1 минуту, ваши <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удары (Strike)</span></a> наносят дополнительный урон, равный вашему модификатору Интеллекта. После завершения Перегрузки, ваши штуковины становятся непригодными для использования, так как они охлаждаются или приводятся в изначальное состояние, и вы 1 минуту не можете использовать Перегрузку.</div>\n<div class=\"line\"><strong>Успех</strong>: Ваши штуковины перегружаются, добавляя мощи вашим атакам. Как критический успех, но дополнительный урон равен половине вашего модификатора Интеллекта.</div>\n<div class=\"line\"><strong>Провал</strong>: У вас случается просчет и ничего не происходит.</div>\n<div class=\"line\"><strong>Критический провал</strong>: Упс! Что-то взрывается. Вы получаете урон огнем, равный своему уровню и не можете 1 минуту использовать Перегрузку, так как ваши штуковины охлаждаются или сбрасываются.</div>\n</div><p><strong>Особенность</strong>: Находясь под эффектами Перегрузки, вы все еще можете использовать действие Перегрузка.\nВы не можете таким образом продлить Перегрузку, но в случае критического успеха можете добиться критической перегрузки.\nПровал не влияет на вашу действующую Перегрузку, а при критическом провале ваша Перегрузка заканчивается.</p>",
      "src": "",
      "originalName": "Overdrive",
      "action": "одиночное действие",
      "id": "action-inventor-overdrive"
  },
  {
      "fullName": "Взорвать (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=902\">Explode</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Взорвать",
      "traits": [
          "нестабильный",
          "воздействие",
          "огонь",
          "изобретатель"
      ],
      "rarity": "",
      "desc": "<span id=\"action-inventor-explode\"></span><p><strong>Источник</strong>: Guns &amp; Gears pg. 19</p><hr class=\"docutils\"><p>Вы намеренно выводите свою инновацию за обычные безопасные ограничения, заставляя ее взорваться и нанести урон существам поблизости, не повредив при этом инновацию... возможно не повредив.\nВзрыв наносит всем существам в 5-футовой эманации 2d6 урона огнем, с простым спасброском Рефлекса (если она надета или вы держите инновацию) или вокруг вашей инновации (если ваша инновация <span class=\"t-minion\">миньон</span>).</p><p>На 3-м уровне и каждый уровень после него, увеличьте урон взрыва на 1d6.</p><p>Если у вас есть особенность класса <a class=\"reference internal\" href=\"#class-feature-inventor-breakthrough-innovation\"><span class=\"std std-ref\">Прорывная инновация (Breakthrough Innovation) / 7-й</span></a>, то при использовании Взрыва вы можете выбрать 5-футовую либо 10-футовую эманацию;\nесли у вас есть особенность класса <a class=\"reference internal\" href=\"#class-feature-inventor-revolutionary-innovation\"><span class=\"std std-ref\">Революционная инновация (Revolutionary Innovation) / 15-й</span></a>, вы можете выбрать 5-футовую, 10-футовую или 15-футовую эманацию.</p>",
      "src": "",
      "originalName": "Explode",
      "action": "активность из 2-х действий",
      "id": "action-inventor-explode"
  },
  {
      "fullName": "Эксплуатировать уязвимость (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1227\">Exploit Vulnerability</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Эксплуатировать уязвимость",
      "traits": [
          "эзотерика",
          "воздействие",
          "тауматург"
      ],
      "rarity": "",
      "desc": "<span id=\"action-thaumaturge-exploit-vulnerability\"></span><p><strong>Частота</strong>: раз в раунд</p><p><strong>Требования</strong>: Вы держите свое орудие</p><hr class=\"docutils\"><p>Вы обращаетесь к своему опыту и знаниям, чтобы идентифицировать что-то, что может отогнать вашего противника.\nВы извлекаете из своей эзотерики объект с подходящими сверхъестественными качествами, а затем используете свое орудие, чтобы разжечь остатки его силы.\nВыберите существо, которое вы можете видеть, и совершите проверку <a class=\"reference internal\" href=\"#class-feature-thaumaturge-esoteric-lore\"><span class=\"std std-ref\">Эзотерических Знаний</span></a> со <a class=\"reference internal\" href=\"../game_mastering/index.html#table-10-5-1\"><span class=\"std std-ref\">стандартным КС для его уровня</span></a>, пока вы достаете нужный объект из своей эзотерики и используете свое орудие, чтобы придать ему силу.\nВы получаете следующие эффекты, пока снова не \"Эксплуатируете уязвимости\".</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Вы вспоминаете слабости существа, и так как вы усиливаете свою эзотерику, у вас случаются вспышки озарения, дающие еще больше знаний о существе. Вы узнаете все сопротивления, слабости и иммунитеты существа, включая значения сопротивлений и слабостей, а также любые нетипичные слабости или уязвимости, как например, какие заклинания пройдут через антимагию голема. Вы можете эксплуатировать либо смертельную слабость существа, либо его личную антитезу (см. далее). Ваши <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удары (Strikes)</span></a> без оружия и оружием по этому существу также становятся <span class=\"t-magical\">магическими</span>, если они еще не были таковыми.</div>\n<div class=\"line\"><strong>Успех</strong>: Вы вспоминаете важный факт о существе, узнавая его сильнейшую слабость (или одну из его сильнейших слабостей, если у него их несколько с одинаковой величиной), но не другие его слабости, сопротивления или иммунитеты. Вы можете эксплуатировать либо смертельную слабость существа, либо его личную антитезу. Ваши <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удары (Strikes)</span></a> без оружия и оружием по этому существу также становятся <span class=\"t-magical\">магическими</span>, если они еще не были таковыми.</div>\n<div class=\"line\"><strong>Провал</strong>: Не сумев вспомнить примечательную слабость существа, вы вместо этого пытаетесь эксплуатировать более личную уязвимость. Вы можете эксплуатировать только личную антитезу существа. Ваши <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удары (Strikes)</span></a> без оружия и оружием по этому существу также становятся <span class=\"t-magical\">магическими</span>, если они еще не были таковыми.</div>\n<div class=\"line\"><strong>Критический провал</strong>: Вы не смогли вспомнить нужный объект для использования и отвлеклись, роясь в своей эзотерике. Вы становитесь <span class=\"c-flat-footed\">застигнуты врасплох</span> до начала своего следующего хода.</div>\n</div><p>⁯</p><p>Вы можете попытаться \"Эксплуатировать уязвимость\" одним из 2 способов: либо вызывая свойства, которые отталкивают данный вид существ, либо предпринимая с помощью вашей эзотерики более импровизационные методы, которые могут наложить произвольную слабость на любое существо, однако обычно она не такая серьезная, как существующая слабость существа.</p><p><strong>Смертельная слабость (Mortal Weakness)</strong>: Определив слабость существа, вы используете тематически резонирующую часть эзотерики, чтобы сонастроить ваши атаки со своим открытием.\nВаши <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удары (Strikes)</span></a> без оружия и оружием активируют сильнейшую слабость, обнаруженную вами при помощи <a class=\"reference internal\" href=\"#action-thaumaturge-exploit-vulnerability\"><span class=\"std std-ref\">Эксплуатировать уязвимость (Exploit Vulnerability) </span></a>, даже с учетом того, что наносимый вами тип урона не меняется.\nЭтот урон влияет на цель вашей \"Эксплуатации уязвимости\", а также любых других существ того же вида, но не других существ с такой же слабостью.\nНапример, сражаясь со стаей <a class=\"reference internal\" href=\"../creatures/bestiary/Werecreature/Werewolf.html\"><span class=\"doc\">вервольфов</span></a>, вы можете использовать серебряную стружку или толченый лунный камень, чтобы наносить урон, применяющий их слабость к серебру от ваших атак по любому из вервольфов, но вы не будете применять этот урон к другим монстрам со слабостью к серебру.</p><p><strong>Личная антитеза (Personal Antithesis)</strong>: Вы импровизируете индивидуальную слабость существа, насильно предъявляя и наделяя силой часть эзотерики, которая отталкивает лично его; например, против тирана вы можете достать сломанную цепь, которая когда-то держала пленника.\nВ этом случае целевое существо, и только оно, получает слабость против ваших <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударов (Strikes)</span></a> без оружия и оружием, равную 2 + половина вашего уровня.</p>",
      "src": "",
      "originalName": "Exploit Vulnerability",
      "action": "одиночное действие",
      "id": "action-thaumaturge-exploit-vulnerability"
  },
  {
      "fullName": "Усилить уязвимость (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1228\">Intensify Vulnerability</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Усилить уязвимость",
      "traits": [
          "эзотерика",
          "магический",
          "прорицание",
          "концентрация",
          "тауматург"
      ],
      "rarity": "",
      "desc": "<span id=\"action-thaumaturge-intensify-vulnerability\"></span><p><strong>Предварительные условия</strong>: <a class=\"reference internal\" href=\"#class-feature-thaumaturge-exploit-vulnerability\"><span class=\"std std-ref\">Эксплуатация уязвимости (Exploit Vulnerability)</span></a></p><p><strong>Частота</strong>: раз в раунд</p><p><strong>Требования</strong>: Вы получаете преимущество от <a class=\"reference internal\" href=\"#action-thaumaturge-exploit-vulnerability\"><span class=\"std std-ref\">Эксплуатировать уязвимость (Exploit Vulnerability) </span></a>, можете видеть субъекта и в этом раунде не использовали <a class=\"reference internal\" href=\"#action-thaumaturge-exploit-vulnerability\"><span class=\"std std-ref\">Эксплуатировать уязвимость (Exploit Vulnerability) </span></a></p><p><strong>Источник</strong>: Dark Archive pg. 35</p><hr class=\"docutils\"><p>Вы снова предъявляете свое орудие и эзотерику, усиливая их влияние на цель уникальным для вашего орудия способом.\nВы получаете преимущество усиленной уязвимости от одного из орудий, которые вы держите, длящееся до начала вашего следующего хода.</p>",
      "src": "",
      "originalName": "Intensify Vulnerability",
      "action": "одиночное действие",
      "id": "action-thaumaturge-intensify-vulnerability"
  },
  {
      "fullName": "Пить из чаши (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1231\">Drink from the Chalice</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Пить из чаши",
      "traits": [
          "магический",
          "некромантия",
          "воздействие",
          "тауматург"
      ],
      "rarity": "",
      "desc": "<span id=\"action-thaumaturge-drink-from-the-chalice\"></span><p><strong>Частота</strong>: раз в раунд</p><p><strong>Требования</strong>: Вы держите свое орудие-чашу</p><p><strong>Источник</strong>: Dark Archive pg. 37</p><hr class=\"docutils\"><p>Вы отпиваете жидкость, которая медленно накапливается в вашей чаше или поите ей находящегося рядом союзника.\nПьющий выбирает сделать ли небольшой глоток или осушить ее содержимое.</p><ul class=\"simple\">\n<li><p><strong>Отпить (Sip)</strong>: Глоток дает пьющему количество временных ОЗ, равное 2 + половина вашего уровня, длящиеся до конца вашего следующего хода.</p></li>\n<li><p><strong>Осушить (Drain)</strong> (<span class=\"t-healing\">исцеление</span>, <span class=\"t-positive\">позитивный</span>): Обильное питье исцеляет пьющего на 3 ОЗ за каждый ваш уровень. После того как чаша осушена, в ней остаются только медленно собирающиеся остатки; чашу нельзя снова осушить, но из нее можно отпивать. Если в течение 10 минут никто не пьет из чаши, она сама наполняется и может быть снова осушена. Если у пьющего <a class=\"reference internal\" href=\"../appendix/glossary_index.html#index-negative-healing\"><span class=\"std std-ref\">негативное исцеление</span></a>, он все равно может исцелиться таким образом, и эффект имеет <span class=\"t-negative\">негативный</span> признак вместо <span class=\"t-healing\">исцеления</span> и <span class=\"t-positive\">позитивного</span>.</p></li>\n</ul>",
      "src": "",
      "originalName": "Drink from the Chalice",
      "action": "одиночное действие",
      "id": "action-thaumaturge-drink-from-the-chalice"
  },
  {
      "fullName": "Отражение зеркала (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1232\">Mirror's Reflection</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Отражение зеркала",
      "traits": [
          "магический",
          "иллюзия",
          "воздействие",
          "тауматург"
      ],
      "rarity": "",
      "desc": "<span id=\"action-thaumaturge-mirrors-reflection\"></span><p><strong>Требования</strong>: Вы держите свое орудие-зеркало</p><p><strong>Источник</strong>: Dark Archive pg. 39</p><hr class=\"docutils\"><p>Вы отражаете свой иллюзорный образ в другое незанятое пространство в пределах 15 футов, которое вы можете видеть.\nДо начала своего следующего хода, вы считаетесь находящимся в обоих пространствах.\nНапример, вы можете атаковать, <a class=\"reference internal\" href=\"../playing_the_game.html#action-seek\"><span class=\"std std-ref\">Искать (Seek)</span></a> и брать в тиски, даже с самим собой.\nВы занимаете оба пространства.</p><p>Ваше зеркальное \"я\" в точности имитирует ваши действия, но любые эффекты, которые вы производите, исходят только с одной из ваших позиций; вы сами решаете из которой из них, каждый раз когда действуете.\nНапример, если бы вы наносили <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike) </span></a> ближнего боя по существу в пределах досягаемости отражения, то вы бы имитировали действия Удара, но сам Удар нанесло бы только отражение.\nВсе, что целится в ваше отражение или может повлиять на него, влияет на вас и использует ваши показатели.\nТо, что целится в вас обоих или воздействует на вас вместе, влияет на вас только 1 раз.\nНапример, <a class=\"reference internal\" href=\"../spells/F/fireball.html#spell-f-fireball\"><span class=\"std std-ref\">Огненный шар (Fireball) / Закл. 3</span></a> включающий вас обоих в свою область, потребует от вас только 1 спасбросок и нанесет урон вам не более 1 раза.\nКогда вы передвигаетесь, то выбираете, с какого квадрата двигаться, но эффект зеркала заканчивается (см. далее).</p><p>Некоторые события заставляют вас решать, какой образ является вашим настоящим, а затем завершить эффект и заставить ваше зеркальное \"я\" исчезнуть; это происходит автоматически в начале вашего следующего хода.\nЭто также происходит, если вы решаете передвинуться из своего пространства.\nДругие преимущества этого орудия добавляют больше событий, которые могут закончить отражение.\nЕще этот эффект завершается, когда вы становитесь <span class=\"c-unconscious\">без сознания</span>, и в этот момент вы решаете, какая из версий является вашей настоящей.</p>",
      "src": "",
      "originalName": "Mirror's Reflection",
      "action": "одиночное действие",
      "id": "action-thaumaturge-mirrors-reflection"
  },
  {
      "fullName": "Бросок магии (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1233\">Fling Magic</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Бросок магии",
      "traits": [
          "магический",
          "эвокация",
          "воздействие",
          "концентрация",
          "тауматург"
      ],
      "rarity": "",
      "desc": "<span id=\"action-thaumaturge-fling-magic\"></span><p><strong>Требования</strong>: Вы держите свое орудие-палочку</p><p><strong>Источник</strong>: Dark Archive pg. 41</p><hr class=\"docutils\"><p>Вы кидаете магическую энергию в цель в пределах 60 футов, нанося урон, равный 1d4 + ваш модификатор Харизмы, с простым спасброском Рефлекса против вашего КС класса.\nНаносимый урон имеет тот же тип, который вы выбрали, когда получили свое орудие-палочку.\nНа 3-м уровне и каждые 2 уровня после этого, урон увеличивается на 1d4.</p><p>Вы можете потратить больше энергии, чем обычно, чтобы усилить эффект \"Броска магии\", используя для урона d6 вместо d4.\nПосле этого палочка перезаряжается 1d4 раунда, в течение которых вы не можете усиливать урон палочки, но можете продолжать \"Бросать магию\" по обычному.\nЕсли вы нанесли критическое попадание <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударом (Strike)</span></a>, ваша палочка мгновенно перезаряжается, поскольку она черпает от этого энергию.</p><p><strong>Особенность</strong>: Эта активность обладает признаком, соответствующим выбранному вами типу урона.</p>",
      "src": "",
      "originalName": "Fling Magic",
      "action": "активность из 2-х действий",
      "id": "action-thaumaturge-fling-magic"
  },
  {
      "fullName": "Проведение стихий (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=2124\">Channel Elements</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Проведение стихий",
      "traits": [
          "аура",
          "природный",
          "кинетик"
      ],
      "rarity": "",
      "desc": "<span id=\"action-kineticist-channel-elements\"></span><p><strong>Требования</strong>: Ваши кинетические врата не активны</p><p><strong>Источник</strong>: Rage of Elements pg. 15</p><hr class=\"docutils\"><p>Вы обращаетесь к своим кинетическим вратам, чтобы заставить стихии течь вокруг вас.\nВаша кинетическая аура активируется и частью этого действия, вы можете применить <a class=\"reference internal\" href=\"#action-kineticist-elemental-blast\"><span class=\"std std-ref\">Удар стихии (Elemental Blast)</span></a> за одиночное действие или <span class=\"t-stance\">стойку</span> <span class=\"t-impulse\">импульса</span> за одиночное действие.\nВаша кинетическая аура это 10-футовая эманация, в которой вокруг вас текут частички кинетической стихии (или всех ваших кинетических стихий, если вы можете использовать несколько).\nКинетическая аура не может ничего повредить или повлиять на ваше окружение, если только другое умение не позволяет ей это сделать.\n\"Проведение стихий\" обладает признаками всех ваших кинетических стихий.</p><p>Кинетическая аура автоматически деактивируется, если вы в нокауте, используете <span class=\"t-impulse\">импульс</span> с признаком <span class=\"t-overflow\">переполнения</span> или <a class=\"reference internal\" href=\"../spells/index.html#action-dismiss\"><span class=\"std std-ref\">Развеиваете (Dismiss)</span></a> данную ауру.\nХоть вы и не можете применять новые <span class=\"t-impulse\">импульсы</span> пока ваша кинетическая аура деактивирована, те, которые вы уже использовали, остаются, и вы все еще можете <a class=\"reference internal\" href=\"../spells/index.html#action-sustain-a-spell\"><span class=\"std std-ref\">Поддерживать (Sustain)</span></a> любые импульсы, которые могут быть поддержаны.\n<span class=\"t-stance\">Стойки</span> <span class=\"t-impulse\">импульсов</span> связаны с вашей кинетической аурой и завершаются когда данная аура деактивируется.</p>",
      "src": "",
      "originalName": "Channel Elements",
      "action": "одиночное действие",
      "id": "action-kineticist-channel-elements"
  },
  {
      "fullName": "Удар стихии (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=2125\">Elemental Blast</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\"> или <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Удар стихии",
      "traits": [
          "атака",
          "импульс",
          "природный",
          "кинетик"
      ],
      "rarity": "",
      "desc": "<span id=\"action-kineticist-elemental-blast\"></span><p><strong>Источник</strong>: Rage of Elements pg. 16</p><hr class=\"docutils\"><p>Взмахом руки вы собираете стихийную материю из своей ауры и взмахиваете ей или запускаете ее.\nВыберите одну из своих кинетических стихий и указанный для нее тип урона, и совершите атаку импульса ближнего или дальнего боя против КБ одного существа.\nДля броска урона \"Удара стихии\" ближнего боя добавьте свой модификатор Силы.\nЕсли вы совершаете \"Удар стихии\" за 2 действия, то получаете бонус состояния к броску урона, равный вашему модификатору Телосложения.\nОт стихии зависит кость урона, тип урона и дистанция (при дальнобойном ударе).\nПри не физическом типе урона, к удару добавляется его соответствующий признак.</p><ul class=\"simple\">\n<li><p><strong>Воздух</strong>: 1d6 электричество или рубящий, 60 футов</p></li>\n<li><p><strong>Земля</strong>: 1d8 дробящий или колющий, 30 футов</p></li>\n<li><p><strong>Огонь</strong>: 1d6 огонь, 60 футов</p></li>\n<li><p><strong>Металл</strong>: 1d8 колющий или рубящий, 30 футов</p></li>\n<li><p><strong>Вода</strong>: 1d8 дробящий или холод, 30 футов</p></li>\n<li><p><strong>Дерево</strong>: 1d8 дробящий или жизненный, 30 футов</p></li>\n</ul><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Цель получает двойной урон.</div>\n<div class=\"line\"><strong>Успех</strong>: Цель получает полный урон.</div>\n</div><hr class=\"docutils\"><p><strong>Уровень (+4)</strong>: Урон увеличивается на 1 кость.</p>",
      "src": "",
      "originalName": "Elemental Blast",
      "action": "одиночное действие",
      "id": "action-kineticist-elemental-blast"
  },
  {
      "fullName": "Базовый кинез (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=2126\">Base Kinesis</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Базовый кинез",
      "traits": [
          "импульс",
          "природный",
          "кинетик"
      ],
      "rarity": "",
      "desc": "<span id=\"action-kineticist-base-kinesis\"></span><p><strong>Источник</strong>: Rage of Elements pg. 16</p><hr class=\"docutils\"><p>Для вас не проблема создать немного своей стихии или изменить уже существующую её часть.\nВыберите для воздействия одну из своих кинетических стихий.\nДистанция этого импульса - 30 футов, а Масса цели должна быть незначительной или легкой.\nМастер решает, какой Массой обладает элемент.\nВы не можете воздействовать на элемент, который является магическим, закреплен на месте (например, камень, уложенный в стену) или находится во владении существа, не готового вам это позволить.</p><p>Выберите один из следующих вариантов, хотя Мастер может разрешить вам вносить похожие небольшие изменения.\n\"Базовый кинез\" не может наносить урон или вызывать состояния, если только не указано иное.</p><ul class=\"simple\">\n<li><p><strong>Создание (Generate)</strong>: Вы достаете обычный, немагический кусочек выбранного элемента из его плана стихии. Элемент может быть использован для любых обычных целей. Например, воздухом может дышать существо, дышащее воздухом, а огонь излучает свет и может поджигать воспламеняющиеся вещества.</p></li>\n<li><p><strong>Передвижение (Move)</strong>: Передвигаете имеющийся кусочек элемента в любом направлении на расстояние вплоть до 20 футов. Если вы доставите его в свое пространство, то можете поймать его в свободной рукой. Вы можете <a class=\"reference internal\" href=\"../spells/index.html#action-sustain-a-spell\"><span class=\"std std-ref\">Поддерживать (Sustain)</span></a> импульс, чтобы продолжать перемещать элемент.</p></li>\n<li><p><strong>Подавление (Suppress)</strong>: Вы уничтожаете кусочек существующего элемента, например, гасите пламя или испаряете воду из чашки. Это касается только естественных форм стихии, а не прочных, созданных вручную вещей, таких как каменная статуя, металлический замок или деревянная дверь.</p></li>\n</ul><hr class=\"docutils\"><p><strong>Уровень (+4)</strong>: Дистанция увеличивается на 15 футов, а максимальная Масса увеличивается на 1 (на 5-м уровне позволяя манипулировать Массой 1).</p>",
      "src": "",
      "originalName": "Base Kinesis",
      "action": "активность из 2-х действий",
      "id": "action-kineticist-base-kinesis"
  },
  {
      "fullName": "Извлечение стихии (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=2127\">Extract Element</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Извлечение стихии",
      "traits": [
          "импульс",
          "природный",
          "кинетик"
      ],
      "rarity": "",
      "desc": "<span id=\"action-kineticist-extract-element\"></span><p><strong>Источник</strong>: Rage of Elements pg. 17</p><hr class=\"docutils\"><p>Вы извлекаете из тела существа материю стихии, чтобы ослабить его и забрать его силу себе.\nВыберите существо в пределах 30 футов, имеющее признак, соответствующий одной из ваших кинетических стихий, или сделанное из одной из ваших кинетических стихий.\nЦель получает 2d4 урона (без типа урона) и становится восприимчивой к вашим <span class=\"t-impulse\">импульсам</span>, в зависимости от своего спасброска Стойкости против вашего КС класса.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Существо невредимо.</div>\n<div class=\"line\"><strong>Успех</strong>: Существо получает половину урона, а вы добавляете часть его стихийной материи в свою <a class=\"reference internal\" href=\"#class-feature-kineticist-kinetic-aura\"><span class=\"std std-ref\">кинетическую ауру</span></a>. Ваши <span class=\"t-impulse\">импульсы</span> обходят любой имеющийся у существа иммунитет к признаку или признакам его стихии, и цель получает штраф обстоятельства -1 к своим спасброскам и КБ против ваших импульсов. Если цель обычно имеет сопротивление, которое было бы применимо к урону от одного из ваших импульсов, то игнорируйте это сопротивление; если она обычно была бы иммунна к этому типу урона, то вместо этого она получает сопротивление к урону от этого импульса, равное своему уровню. Вы не можете выбирать существо целью с помощью \"Извлечения стихии\", если материя стихии, которую вы извлекли из него, уже находится в вашей кинетической ауре. Эти эффекты длятся 5 минут или до окончания действия вашей кинетической ауры, в зависимости от того, что произойдет раньше.</div>\n<div class=\"line\"><strong>Провал</strong>: Как успех, но цель получает полный урон.</div>\n<div class=\"line\"><strong>Критический провал</strong>: Как провал, но цель получает двойной урон.</div>\n</div><hr class=\"docutils\"><p><strong>Уровень (+2)</strong>: Урон увеличивается на 1d4.</p>",
      "src": "",
      "originalName": "Extract Element",
      "action": "одиночное действие",
      "id": "action-kineticist-extract-element"
  },
  {
      "fullName": "Зачарованный удар (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=755\">Spellstrike</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Зачарованный удар",
      "traits": [
          "магус"
      ],
      "rarity": "",
      "desc": "<span id=\"action-magus-spellstrike\"></span><p><strong>Частота</strong>: До подзарядки (см. далее)</p><hr class=\"docutils\"><p>Вы направляете заклинание в безоружный удар или удар оружием, чтобы нанести комбинированную атаку.\nВы <a class=\"reference internal\" href=\"../spells/index.html#action-cast-a-spell\"><span class=\"std std-ref\">Сотворяете (Cast)</span></a> заклинание, для которого требуется 1 или 2 действия и бросок атаки заклинания.\nЭффекты заклинания возникают не сразу, а вместо этого проникают в вашу атаку.\nСовершите <a class=\"reference internal\" href=\"../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike) </span></a> ближнего боя оружием или безоружной атакой.\nВаше заклинание сочетается с вашей атакой, используя результат броска атаки, чтобы определить эффекты как Удара, так и заклинания.\nЭто считается за две атаки для расчета штрафа множественной атаки, но вы не применяете штраф до тех пор, пока не завершите \"Зачарованный удар\".\nВливание энергии заклинания придает вашему Удару признак <span class=\"t-arcana\">аркана</span>, делая его <span class=\"t-magical\">магическим</span>.</p><p>После использования \"Зачарованного удара\", вы не сможете сделать это снова, пока не подзарядите \"Зачарованный удар\" одиночным действием, имеющим признак <span class=\"t-concentrate\">концентрация</span>.\nЕще вы подзаряжаете свой \"Зачарованный удар\", когда сотворяете <a class=\"reference internal\" href=\"#class-feature-magus-conflux-spells\"><span class=\"std std-ref\">Заклинания слияния (Conflux Spells)</span></a>, для которого требуется минимум 1 действие; сотворение заклинания фокусировки другого типа не заряжает ваш \"Зачарованный удар\".</p>",
      "src": "",
      "originalName": "Spellstrike",
      "action": "активность из 2-х действий",
      "id": "action-magus-spellstrike"
  },
  {
      "fullName": "Восстановление разума (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1223\">Restore the Mind</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Восстановление разума",
      "traits": [
          "психика",
          "очарование",
          "исцеление",
          "эмоция",
          "ментальный",
          "экстрасенс"
      ],
      "rarity": "",
      "desc": "<span id=\"action-psychic-restore-the-mind\"></span><p><strong>Источник</strong>: Dark Archive pg. 15</p><p>Ваша раскрытая психика дает вам более тесную связь с эмоциями ваших союзников, позволяя вам проецировать уверенность и силу, восполняющую их разум и тело.\nВыберите 1 из двух преимуществ предоставляемых 1 союзнику, которого вы можете видеть, в пределах 30 футов.\nПосле этого, данный союзник временно иммунен на 10 минут.</p><ul class=\"simple\">\n<li><p>Союзник получает бонус состояния +1 к спасброскам против <span class=\"t-mental\">ментальных</span> эффектов, пока раскрыта ваша психика.</p></li>\n<li><p>Союзник восстанавливает ОЗ в количестве равном 2 + ваш удвоенный уровень.</p></li>\n</ul>",
      "src": "",
      "originalName": "Restore the Mind",
      "action": "одиночное действие",
      "id": "action-psychic-restore-the-mind"
  },
  {
      "fullName": "Вспомнить учения (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1224\">Recall the Teachings</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Вспомнить учения",
      "traits": [
          "психика",
          "оккультный",
          "прорицание",
          "экстрасенс"
      ],
      "rarity": "",
      "desc": "<span id=\"action-psychic-recall-the-teachings\"></span><p><strong>Источник</strong>: Dark Archive pg. 15</p><p>Усиленная мощь вашей психики позволяет вам вспомнить все уроки, которые вы когда-либо проходили.\nВы перебираете в уме нужные учения, которые поначалу кажутся загадочными, но становятся ясными в самый актуальный момент.\nДо начала своего следующего хода вы считаетесь подготовившимся к <a class=\"reference internal\" href=\"../playing_the_game.html#action-aid\"><span class=\"std std-ref\">Помощи (Aid)</span></a> всем союзникам в пределах 30 футов от вас.\nЕсли в течение этого времени вы используете реакцию Помощи, чтобы содействовать одному из них, то вы кидаете проверку Оккультизма для Помощи, так как вспоминаете урок, чтобы помочь им.\nБольшинство уроков имеют форму коротких аксиом, притч или изречений, поэтому передача их союзнику обычно дает вашей реакции Помощи признаки <span class=\"t-auditory\">слуховой</span> и <span class=\"t-linguistic\">языковой</span>.</p>",
      "src": "",
      "originalName": "Recall the Teachings",
      "action": "одиночное действие",
      "id": "action-psychic-recall-the-teachings"
  },
  {
      "fullName": "Рассчитать угрозы (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1225\">Calculate Threats</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Рассчитать угрозы",
      "traits": [
          "психика",
          "ментальный",
          "экстрасенс"
      ],
      "rarity": "",
      "desc": "<span id=\"action-psychic-calculate-threats\"></span><p><strong>Источник</strong>: Dark Archive pg. 16</p><p>Когда ваш разум раскрыт, ваше подсознание автоматически рассчитывает векторы и силы, показывая вам вероятный путь входящих атак для их избегания.\nВы получаете бонус обстоятельства +2 к КБ и спасброскам Рефлекса до начала своего следующего хода.</p>",
      "src": "",
      "originalName": "Calculate Threats",
      "action": "одиночное действие",
      "id": "action-psychic-calculate-threats"
  },
  {
      "fullName": "Исчезание в грёзах (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1226\">Fade into Daydreams</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Исчезание в грёзах",
      "traits": [
          "психика",
          "иллюзия",
          "экстрасенс"
      ],
      "rarity": "",
      "desc": "<span id=\"action-psychic-fade-into-daydreams\"></span><p><strong>Источник</strong>: Dark Archive pg. 16</p><p>Ваши полеты воображения проникают в реальный мир, в результате чего вы становитесь неясным, туманным или окутанным вымыслом.\nВы становитесь <span class=\"c-concealed\">скрыты</span> до начала своего следующего хода.\nЭто <span class=\"c-concealed\">сокрытие</span> нельзя использовать чтобы <a class=\"reference internal\" href=\"../skills.html#skill-stealth-hide\"><span class=\"std std-ref\">Спрятаться (Hide) </span></a>, как и обычно в случае с эффектами сокрытия, которые делают ваше местоположение очевидным.</p>",
      "src": "",
      "originalName": "Fade into Daydreams",
      "action": "одиночное действие",
      "id": "action-psychic-fade-into-daydreams"
  },
  {
      "fullName": "Поддержка (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=342\">Support</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Поддержка",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-animal-support\"></span><p><strong>Требования</strong>: Существо является зверем-компаньоном</p><hr class=\"docutils\"><p>Ваш зверь-компаньон поддерживает вас.\nВы получаете преимущества, перечисленные в записи вида компаньона, \"Преимущество поддержки\".\nЕсли зверь использует действие Поддержка, то единственные другие действия, которые он может использовать в этот ход - простые действия передвижения, чтобы занять позицию и воспользоваться преимуществами Поддержки; если он уже использовал другие действия в этом ходу, то не может Поддержать вас.</p>",
      "src": "",
      "originalName": "Support",
      "action": "одиночное действие",
      "id": "action-animal-support"
  },
  {
      "fullName": "Проблеск уязвимости (Glimpse Vulnerability) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Проблеск уязвимости",
      "traits": [
          "эзотерика",
          "воздействие"
      ],
      "rarity": "",
      "desc": "<span id=\"action-thaumaturge-glimpse-vulnerability\"></span><p><strong>Частота</strong>: раз в раунд</p><p><strong>Требования</strong>: Вы держите свое орудие</p><p><strong>Источник</strong>: Dark Archive pg. 49</p><hr class=\"docutils\"><p>Вы замечаете скрытую уязвимость, а затем усиливаете ее, чтобы помочь себе.\nВыберите существо, которое вы можете видеть.\nПока вы снова не используете \"Проблеск уязвимости\", эта цель получает слабость 2 против ваших <a class=\"reference internal\" href=\"../../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Ударов (Strikes)</span></a> без оружия и оружием.</p>",
      "src": "",
      "originalName": "Glimpse Vulnerability",
      "action": "одиночное действие",
      "id": "action-thaumaturge-glimpse-vulnerability"
  },
  {
      "fullName": "Вдумчивая перезарядка (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=922\">Thoughtful Reload</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Вдумчивая перезарядка",
      "traits": [
          "стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-spellshot-thoughtful-reload\"></span><p><strong>Источник</strong>: Guns &amp; Gears pg. 140</p><hr class=\"docutils\"><p>Когда вы погружаетесь в состояние аналитического спокойствия и сосредотачиваетесь на противнике перед собой, ваши руки инстинктивно перезаряжают пулю.\nСовершите проверку <a class=\"reference internal\" href=\"../../skills.html#skill-recall-knowledge\"><span class=\"std std-ref\">Вспомнить информацию (Recall Knowledge) </span></a> против противника, которого вы можете видеть, а затем <a class=\"reference internal\" href=\"../../playing_the_game.html#action-interact\"><span class=\"std std-ref\">Взаимодействуете (Interact)</span></a> для перезарядки.</p>",
      "src": "",
      "originalName": "Thoughtful Reload",
      "action": "одиночное действие",
      "id": "action-spellshot-thoughtful-reload"
  },
  {
      "fullName": "Рассеивающая пуля (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=925\">Dispelling Bullet</a>) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Рассеивающая пуля",
      "traits": [
          "магический",
          "преграждение",
          "маг.стрелок"
      ],
      "rarity": "",
      "desc": "<span id=\"action-spellshot-dispelling-bullet\"></span><p><strong>Источник</strong>: Guns &amp; Gears pg. 140</p><hr class=\"docutils\"><p>Вы накладываете на пулю поле <span class=\"t-abjuration\">преграждения</span>, созданное на основе вашей характерной магической черты, разрушая магию всего, во что она попадет.\nСовершите <a class=\"reference internal\" href=\"../../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Выстрел (Strike)</span></a> из огнестрельного оружия или арбалета по противнику, которого вы можете видеть.\nВ случае попадания, вы пытаетесь <a class=\"reference internal\" href=\"../../playing_the_game.html#ch9-counteracting\"><span class=\"std std-ref\">противодействовать</span></a> эффекту заклинания, действующему на цель (на вашем выбор или самому высокоуровневому эффекту, если вы не выбрали).\nВаш уровень противодействия равен половине вашего уровня (округленного до большего целого), а модификатор проверки противодействия равен вашему КС класса - 10.</p>",
      "src": "",
      "originalName": "Dispelling Bullet",
      "action": "активность из 2-х действий",
      "id": "action-spellshot-dispelling-bullet"
  },
  {
      "fullName": "Наколдовать пулю (Conjure Bullet) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Наколдовать пулю",
      "traits": [
          "магический",
          "воплощение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-spellshot-conjure-bullet\"></span><p><strong>Частота</strong>: раз в раунд</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 140</p><hr class=\"docutils\"><p>Вы воплощаете обычную пулю или болт 0-го уровня прямо из воздуха, и затем мгновенно <a class=\"reference internal\" href=\"../../playing_the_game.html#action-interact\"><span class=\"std std-ref\">Взаимодействуете (Interact)</span></a>, чтобы зарядить ее в свое оружие.\nЕсли эти пуля или болт не отстрелены до конца вашего хода, то этот эффект тратится.</p>",
      "src": "",
      "originalName": "Conjure Bullet",
      "action": "одиночное действие",
      "id": "action-spellshot-conjure-bullet"
  },
  {
      "fullName": "Превзойти (Upstage) <img alt=\"реакция\" class=\"action action-reaction\" src=\"PF_action_reaction.webp\" style=\"height: 1em;\">",
      "name": "Превзойти",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-celebrity-upstage\"></span><p><strong>Триггер</strong>: Враг совершает проверку навыка, и не получает критический успех</p><hr class=\"docutils\"><p>После того, как ваш враг сделал все возможное, вы показываете всем, как это делается на самом деле.\nСделайте проверку, используя тот же навык, который спровоцировал эту реакцию.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: До конца своего следующего хода вы получаете бонус состояния +1 к броскам атак, проверкам Восприятия, спасброскам и проверкам навыков</div>\n<div class=\"line\"><strong>Успех</strong>: Как крит.успех, но вы получаете эти преимущества только если спровоцировавшее существо провалило свою проверку навыка</div>\n</div>",
      "src": "",
      "originalName": "Upstage",
      "action": "реакция",
      "id": "action-celebrity-upstage"
  },
  {
      "fullName": "Мистический выстрел (Eldritch Shot) <img alt=\"активность из 3-х действий\" class=\"action action-3\" src=\"/PF_action_3.webp\" style=\"height: 1em;\">",
      "name": "Мистический выстрел",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-eldritch-archer-eldritch-shot\"></span><p><strong>Требования</strong>: Вы владеете оружием из группы \"лук\"</p><hr class=\"docutils\"><p>Вы выполняете <a class=\"reference internal\" href=\"../../spells/index.html#action-cast-a-spell\"><span class=\"std std-ref\">Сотворение заклинания (Cast a Spell)</span></a>, на которое требуется 1 или 2 действия и требуется выполнить атаку заклинанием.\nЭффекты заклинания происходят не сразу, а проникают в лук, которым вы владеете.\nСовершите <a class=\"reference internal\" href=\"../../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Выстрел (Strike)</span></a> из этого лука.\nВаше заклинание летит вместе с амуницией, используя ваш результат броска атаки для определения эффектов попадания обоих, и Выстрела и заклинания.\nЭто считается как 2 атаки для вашего штрафа множественной атаки, но вы не применяете этот штраф до завершения обоих атак.</p>",
      "src": "",
      "originalName": "Eldritch Shot",
      "action": "активность из 3-х действий",
      "id": "action-eldritch-archer-eldritch-shot"
  },
  {
      "fullName": "Метание заклинания (Spellsling) <img alt=\"активность из 3-х действий\" class=\"action action-3\" src=\"/PF_action_3.webp\" style=\"height: 1em;\">",
      "name": "Метание заклинания",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-beast-gunner-spellsling\"></span><p><strong>Требования</strong>: Вы владеете своим связанным чудовищным оружием</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 131</p><hr class=\"docutils\"><p>Вы <a class=\"reference internal\" href=\"../../spells/index.html#action-cast-a-spell\"><span class=\"std std-ref\">Сотворяете (Cast)</span></a> заклинание на которое требуется 1 или 2 действия и которое требует бросок атаки заклинания.\nЭффекты заклинания происходят не сразу, а проникают в чудовищное оружие, которым вы владеете.\nСовершите <a class=\"reference internal\" href=\"../../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удар (Strike)</span></a> этим чудовищным оружием.\nВаше заклинание летит вместе с амуницией, используя ваш результат броска атаки для определения эффектов попадания обоих, и Удара и заклинания.\nЭто считается как 2 атаки для вашего штрафа множественной атаки, но вы не применяете этот штраф до определения результатов атаки и заклинания.</p>",
      "src": "",
      "originalName": "Spellsling",
      "action": "активность из 3-х действий",
      "id": "action-beast-gunner-spellsling"
  },
  {
      "fullName": "Стойка пулевого танцора (Bullet Dancer Stance) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Стойка пулевого танцора",
      "traits": [
          "стойка"
      ],
      "rarity": "",
      "desc": "<span id=\"action-bullet-dancer-stance\"></span><p><strong>Требования</strong>: Вы без доспеха и владеете простым огнестрельным оружием, штыком или усиленным прикладом</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 132</p><hr class=\"docutils\"><p>Вы встаете в специальную стойку уникального боевого искусства, ориентированного на использование простого огнестрельного оружия.\nВ этой стойке, вы можете совершать только <a class=\"reference internal\" href=\"../../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Удары (Strikes)</span></a> штыками, усиленными прикладами и простым огнестрельным оружием.\nВы можете использовать с этим оружием <a class=\"reference internal\" href=\"../monk.html#action-monk-flurry-of-blows\"><span class=\"std std-ref\">Шквал ударов (Flurry of Blows) </span></a>.\nВы можете использовать со штыками и усиленными прикладами свои другие способности или умения <span class=\"t-monk\">монаха</span>, которые обычно требуют применения безоружных атак, пока эта способность или умение не требует одного специфичного Удара.\nЕще вы можете использовать их с простым огнестрельным оружием при атаке в пределах половины 1-го шага дистанции.</p>",
      "src": "",
      "originalName": "Bullet Dancer Stance",
      "action": "одиночное действие",
      "id": "action-bullet-dancer-stance"
  },
  {
      "fullName": "Установить взрывчатку (Set Explosives) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Установить взрывчатку",
      "traits": [
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-demolitionist-set-explosives\"></span><p><strong>Требования</strong>: У вас в руке 1 или 2 бомбы</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 133</p><hr class=\"docutils\"><p>Вы прикрепляете бомбы к неодушевленному объекту в пределах досягаемости, такому как дверь, стена или колонна, и настраиваете их на взрыв в определенное время.\nБомбы взрываются в установленное вами время (например, после вашего следующего действия или в начале вашего следующего хода, до максимума в 1 минуту), нанося неодушевленному предмету свой урон и урон <span class=\"t-splash\">брызгами</span>.\nДля сопротивлений и слабостей сложите этот урон, и он игнорирует величину Твердости объекта, равную вашему уровню.\nЛюбые существа, находящиеся рядом с опасностью получают урон брызгами от бомб, также сложенный, для сопротивлений и слабостей.\nПросто напоминание, так как вы не метаете бомбы, то <a class=\"reference internal\" href=\"../alchemist.html#class-feat-alchemist-calculated-splash\"><span class=\"std std-ref\">Рассчитанные брызги (Calculated Splash) / 4</span></a> и подобные эффекты не применяются.\nЧтобы убедиться в правильности расчета времени, требуется концентрация, поэтому вы не можете \"Установить взрывчатку\" снова, пока ждете детонации ранее установленной бомбы.</p>",
      "src": "",
      "originalName": "Set Explosives",
      "action": "активность из 2-х действий",
      "id": "action-demolitionist-set-explosives"
  },
  {
      "fullName": "Запуск фейерверка (Launch Fireworks Display) от <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\"> до <img alt=\"активность из 3-х действий\" class=\"action action-3\" src=\"/PF_action_3.webp\" style=\"height: 1em;\">",
      "name": "Запуск фейерверка",
      "traits": [
          "воздействие"
      ],
      "rarity": "",
      "desc": "<span id=\"action-firework-technician-launch-fireworks-display\"></span><p><strong>Стоимость</strong>: 1 или более порций насыщенных реагентов</p><p><strong>Требования</strong>: У вас свободна рука</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 134</p><hr class=\"docutils\"><p>Вы запускаете фейерверк.\nВы можете запустить обычный фейерверк, чтобы просто создать визуальный или звуковой сигнал в пределах 20 футов, или выбрать один из следующих специальных эффектов.\nФейерверк обладает перечисленными признаками, и если он стоит больше 1 порции насыщенных реагентов, это отмечено в записи \"Стоимость\".</p><p><strong>Комета (Comet)</strong> <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\"> (<span class=\"t-visual\">визуальный</span>)\nВы стреляете полосой сияющего света в форме 60-футовой линии.\nДо начала вашего следующего хода, все пространства в этой линии освещены ярким светом.\nЧастью этого действия вы также можете <a class=\"reference internal\" href=\"../../playing_the_game.html#action-point-out\"><span class=\"std std-ref\">Указать (Point Out) </span></a> на 1 существо в линии, при этом ваши союзники не обязаны вас слышать или понимать.</p><p><strong>Цветок (Flower)</strong> <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\"> (<span class=\"t-visual\">визуальный</span>)\nВы зажигаете кольцо искр, создавая форму, которая может напоминать распустившийся в небе цветок.\nКаждый враг в 20 футах от вас должен совершить спасбросок Стойкости.\nПри провале враг <span class=\"c-dazzled\">ослеплен</span> на 1 раунд, а при критическом провале на 2 раунда.</p><p><strong>Салют (Salute)</strong> <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\"> (<span class=\"t-auditory\">слуховой</span>)\nВы создаете поразительный грохот или свист, добавляя к вашему фейерверку <span class=\"t-auditory\">слуховой</span> компонент.\nКогда вы запускаете салют, вы можете в пределах 60 футов выбрать союзника с состоянием <span class=\"c-confused\">замешательство</span> или <span class=\"c-fascinated\">заворожен</span>.\nЕсли выбранный вами союзник <span class=\"c-fascinated\">заворожен</span>, шум настолько силён, что на его состояние завороженности он действует как враждебный эффект (однако без негативных последствий), автоматически прекращая большинство применений состояния <span class=\"c-fascinated\">заворожен</span>.\nЕсли союзник <span class=\"c-confused\">в замешательстве</span>, звук настолько громкий и сильный, что может вывести его из замешательства.\nОн может мгновенное совершить чистую проверку, чтобы убрать состояние <span class=\"c-confused\">замешательства</span>, что обычно происходит, когда существо получает урон.\nЕсли у <span class=\"c-confused\">замешательства</span> есть специальные правила, которые отменяют чистую проверку при получении урона или усложняют чистую проверку, то эти правила также применяются и к салюту.</p>",
      "src": "",
      "originalName": "Launch Fireworks Display",
      "action": "одиночное действие",
      "id": "action-firework-technician-launch-fireworks-display"
  },
  {
      "fullName": "Случайный выстрел (Accidental Shot) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Случайный выстрел",
      "traits": [
          "удача"
      ],
      "rarity": "",
      "desc": "<span id=\"action-unexpected-sharpshooter-accidental-shot\"></span><p><strong>Частота</strong>: раз в день</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 142</p><hr class=\"docutils\"><p>Вы совершаете <a class=\"reference internal\" href=\"../../playing_the_game.html#action-strike\"><span class=\"std std-ref\">Выстрел (Strike)</span></a> дистанционным оружием, кидая атаку и урон дважды и используя лучший результат для каждого.\nЭта атака игнорирует штрафы обстоятельства на бросок атаки и любые чистые проверки, необходимые из-за того что цель <span class=\"c-concealed\">скрыта</span> или <span class=\"c-hidden\">спрятана</span>.</p>",
      "src": "",
      "originalName": "Accidental Shot",
      "action": "активность из 2-х действий",
      "id": "action-unexpected-sharpshooter-accidental-shot"
  },
  {
      "fullName": "Милосердие духа (Spirit's Mercy) <img alt=\"реакция\" class=\"action action-reaction\" src=\"PF_action_reaction.webp\" style=\"height: 1em;\">",
      "name": "Милосердие духа",
      "traits": [
          "некромантия"
      ],
      "rarity": "",
      "desc": "<span id=\"action-exorcist-spirits-mercy\"></span><p><strong>Триггер</strong>: Вы получаете позитивный или негативный урон, либо вы получаете урон любого типа от <span class=\"t-haunt\">призрака</span>, <span class=\"t-ghost\">привидения</span> или другой <span class=\"t-incorporeal\">бестелесной</span> <span class=\"t-undead\">нежити</span></p><p><strong>Стоимость</strong>: 1 частичка или остаток духа</p><hr class=\"docutils\"><p>Вы очищаете дух, заставляя его совершить последний акт милосердия, чтобы уменьшить ущерб, причиненный другим духом.\nЭто дает вам против спровоцировавшего эффекта сопротивление позитивному и негативному урону (или сопротивление всему урону, если они нанесены <span class=\"t-haunt\">призраком</span> или <span class=\"t-incorporeal\">бестелесной</span> <span class=\"t-undead\">нежитью</span>).\nЕсли вы потратите частичку духа, сопротивление равно вашему удвоенному уровню (×2).\nЕсли вы потратите остаток духа, сопротивление равно утроенному уровню (×3) бестелесной нежити или призрака, от которого вы получили эти остатки.</p>",
      "src": "",
      "originalName": "Spirit's Mercy",
      "action": "реакция",
      "id": "action-exorcist-spirits-mercy"
  },
  {
      "fullName": "Идентификация истребителя (Slayer's Identification) <img alt=\"свободное действие\" class=\"action action-free\" src=\"/PF_action_free.webp\" style=\"height: 1em;\">",
      "name": "Идентификация истребителя",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-undead-slayer-identification\"></span><p><strong>Триггер</strong>: Вы кидаете инициативу и можете заметить существо, которое, как вы знаете, является <span class=\"t-undead\">нежитью</span></p><hr class=\"docutils\"><p>Вы пытаетесь <a class=\"reference internal\" href=\"../../skills.html#skill-recall-knowledge\"><span class=\"std std-ref\">Вспомнить информацию (Recall Knowledge)</span></a> с бонусом обстоятельства +1, чтобы идентифицировать эту <span class=\"t-undead\">нежить</span>.\nЕсли вы мастер навыка использованного для \"Вспоминания информации\", то вместо этого получаете бонус обстоятельства +2.</p>",
      "src": "",
      "originalName": "Slayer's Identification",
      "action": "свободное действие",
      "id": "action-undead-slayer-identification"
  },
  {
      "fullName": "Поедание плоти (Consume Flesh) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Поедание плоти",
      "traits": [
          "воздействие"
      ],
      "rarity": "",
      "desc": "<span id=\"action-ghoul-consume-flesh\"></span><p><strong>Требования</strong>: Вы рядом с трупом <span class=\"s-small\">маленького</span> и более крупного существа, умершего за прошедший час</p><p><strong>Источник</strong>: Book of the Dead pg. 48</p><hr class=\"docutils\"><p>Вы пожираете кусок тела.\nВы становитесь сыты на 1 час.</p>",
      "src": "",
      "originalName": "Consume Flesh",
      "action": "одиночное действие",
      "id": "action-ghoul-consume-flesh"
  },
  {
      "fullName": "Пить кровь (Drink Blood) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Пить кровь",
      "traits": [
          "сакральный",
          "некромантия"
      ],
      "rarity": "",
      "desc": "<span id=\"action-vampire-drink-blood\"></span><p><strong>Требования</strong>: В вашей досягаемости есть <span class=\"c-grabbed\">схваченное</span>, <span class=\"c-paralyzed\">парализованное</span>, <span class=\"c-restrained\">сдерживаемое</span>, находящееся <span class=\"c-unconscious\">без сознания</span> или готовое существо</p><p><strong>Источник</strong>: Book of the Dead pg. 58</p><hr class=\"docutils\"><p>Вы вонзаете свои клыки в это существо и пьете его кровь.\nЕсли жертва <span class=\"c-grabbed\">схвачена</span>, то для этого требуется проверка Атлетики против КС Стойкости жертвы, а в остальных случаях происходит автоматически.\nПри успехе, жертва <span class=\"c-drained\">истощена 1</span>, а вы получаете временные ОЗ, равные уровню жертвы, которые длятся 10 минут.\nДальнейшее использование против этой же цели не увеличивает состояние <span class=\"c-drained\">истощения</span> и не дает больше временных ОЗ.</p>",
      "src": "",
      "originalName": "Drink Blood",
      "action": "одиночное действие",
      "id": "action-vampire-drink-blood"
  },
  {
      "fullName": "Принятие роли (Assume a Role)",
      "name": "Принятие роли",
      "traits": [
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-alter-ego-assume-a-role\"></span><p><strong>Требования</strong>: Вы потратили не менее 1 часа на изучение существа, чью роль вы собираетесь копировать, и сделали это за прошлые 3 дня.\nЭто может включать в себя встречу и обучение у кого-то в этой роли, слежку и шпионаж за кем-то, использование магии для наблюдения за его работой или любой другой метод, при условии, что у вас есть визуальный источник информации.</p><p><strong>Источник</strong>: Dark Archive pg. 126</p><hr class=\"docutils\"><p>Вы быстро и точно учитесь выполнять обыденную работу или, по крайней мере, копировать движения настолько, что кажется, будто вы это делаете.\nВыбранная роль может принимать различные формы - от повара, уборщика или библиотекаря до члена культа, священника или герцога - но это всегда роль, а не конкретный индивид.</p><p>Вы выполняете активность <a class=\"reference internal\" href=\"../../skills.html#skill-deception-impersonate\"><span class=\"std std-ref\">Перевоплотиться (Impersonate)</span></a>, чтобы выдать себя за представителя той роли, за которой вы наблюдали, и получаете бонус обстоятельства +1 к любым проверкам Обмана, которые вы совершаете, выдавая себя за другого.\nЭто занимает обычное времени, требуемое вам для Перевоплощения.\nЕще вы выбираете один навык Знаний, относящийся к этой роли (например, Фермерские Знания для фермера).\nНаходясь в роли, вы получаете бонус обстоятельства +1 к проверкам этих Знаний, а если вы нетренированы ему, то в качестве бонуса мастерства можете использовать свой уровень.\nВы перестаете принимать эту роль через 24 часа, если начинаете обучаться новой роли или по своему выбору.</p>",
      "src": "",
      "originalName": "Assume a Role",
      "id": "action-alter-ego-assume-a-role"
  },
  {
      "fullName": "Возрождение сущности (Entity's Resurgence) <img alt=\"реакция\" class=\"action action-reaction\" src=\"PF_action_reaction.webp\" style=\"height: 1em;\">",
      "name": "Возрождение сущности",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-living-vessel-entitys-resurgence\"></span><p><strong>Триггер</strong>: Ваши ОЗ будут снижены до 0, но это не убивает вас мгновенно</p><p><strong>Источник</strong>: Dark Archive pg. 140</p><hr class=\"docutils\"><p>Вместо того чтобы позволить вам <span class=\"c-unconscious\">потерять сознание</span>, над вами берет контроль ваша сущность.\nВы остаетесь с 1 ОЗ и получаете временные ОЗ, равные вашему уровню + модификатору ключевой характеристики, которые длятся 1 минуту.\nОднако сущность контролирует вас 1 минуту или пока вы не потеряете сознание, в зависимости от того, что произойдет раньше.</p><p>Находясь под контролем сущности, вы получаете бонус состояния +1 к броскам атак и урона, а Мастер обычно управляет вашим персонажем, играя роль сущности.\nМастер может решить, что вы будете отыгрывать сущность вместо него, но за ним остается право окончательного контроля над любыми вашими решениями.\nНезависимо от природы сущности, она обязательно отомстит врагу, поставившему под угрозу жизнь ее сосуда - даже злая сущность не станет менять союзников или игнорировать опасность, за исключением самых крайних обстоятельств.</p>",
      "src": "",
      "originalName": "Entity's Resurgence",
      "action": "реакция",
      "id": "action-living-vessel-entitys-resurgence"
  },
  {
      "fullName": "Связывающий обет (Binding Vow) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Связывающий обет",
      "traits": [
          "оккультный",
          "очарование",
          "слуховой",
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-pactbinder-binding-vow\"></span><p><strong>Частота</strong>: раз в день</p><p><strong>Источник</strong>: Dark Archive pg. 166</p><hr class=\"docutils\"><p>Вы ограничиваете себя, формально произнося связывающий обет.\nКогда вы произносите этот обет, сверхъестественная сила течет через вас и вокруг вас, и все присутствующие слушатели, внутренне знают, что она связывает вас.\nНарушение этого обета для вас является анафемой, а если вы нарушаете ее добровольно, то теряете все преимущества заключающего пакты, пока не выполните свой обет или, если это невозможно, не примете участие в ритуале <a class=\"reference internal\" href=\"../../spells/rituals.html#ritual-atone\"><span class=\"std std-ref\">Искупление (Atone) / Ритуал 4</span></a>.\nОбет не предотвращает невольных нарушений и не может быть использована для попыток обойти магию контроля разума, <span class=\"c-confused\">замешательство</span> или подобные ситуации, когда вы совершаете действие не совсем по своей воле.\n\"Связывающий обет\" не заканчивается, пока вы не выполните его.\nДаже если вы умрете и вернетесь к жизни, обет все равно связывает вас.\nОбет не заставляет вас идти на нелепые крайности, такие как смерть, для его исполнения, если только вы специально не поклялись пойти на такие крайности.\nПопытка нарушить обет, давая корыстные обещания (например, поклясться союзнику, что убьешь того, кого уже хотел убить), сама по себе является нарушением обета, как и попытка нарушить другие уже данные обеты (например, обеты из других способностей заключающего пакты или <a class=\"reference internal\" href=\"../champion.html#class-feature-champion-code\"><span class=\"std std-ref\">кодекса чемпиона</span></a>).</p><p>Когда вы делаете <a class=\"reference internal\" href=\"../../skills.html#skill-diplomacy-request\"><span class=\"std std-ref\">Просьбу (Request)</span></a> или <a class=\"reference internal\" href=\"../../skills.html#skill-intimidation-coerce\"><span class=\"std std-ref\">Принуждение (Coerce)</span></a> непосредственно для выполнения своего обета, то получаете к своей проверке бонус обстоятельства +1 против любых существ, знающих о вашем обете.</p>",
      "src": "",
      "originalName": "Binding Vow",
      "action": "одиночное действие",
      "id": "action-pactbinder-binding-vow"
  },
  {
      "fullName": "Извергнуть вихрь (Expel Maelstrom) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Извергнуть вихрь",
      "traits": [
          "оккультный",
          "некромантия",
          "проклятие"
      ],
      "rarity": "",
      "desc": "<span id=\"action-curse-maelstrom-expel-maelstrom\"></span><p><strong>Требования</strong>: Вы в состоянии вихря проклятий</p><p><strong>Источник</strong>: Dark Archive pg. 168</p><hr class=\"docutils\"><p>Вы извергаете вихрь из своего тела, посылая энергию в одно неудачливое существо в пределах 60 футов.\nВаше состояние вихря проклятия заканчивается.\nРезультат зависит от спасброска Воли существа.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Существо невредимо и энергия проклятия безвредно развеивается.</div>\n<div class=\"line\"><strong>Успех</strong>: Существо становится вместилищем гнева вихря. Оно получает штраф состояния -1 ко всем спасброскам и проверкам навыков на 1 минуту.</div>\n<div class=\"line\"><strong>Провал</strong>: Вихрь сильнее проникает в душу существа. Оно получает штраф состояния -2 ко всем спасброскам и проверкам навыков на 10 минут.</div>\n<div class=\"line\"><strong>Критический провал</strong>: Вихрь ввергает существо в один приступ полного невезения, а затем зарывается в его душу. Как провал, но существо также должно бросить дважды и взять меньший результат при следующем спасброске или проверке навыка; это эффект <span class=\"t-misfortune\">неудачи</span>.</div>\n</div>",
      "src": "",
      "originalName": "Expel Maelstrom",
      "action": "одиночное действие",
      "id": "action-curse-maelstrom-expel-maelstrom"
  },
  {
      "fullName": "Грезящий транс (Daydream Trance) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Грезящий транс",
      "traits": [
          "оккультный",
          "очарование",
          "ментальный"
      ],
      "rarity": "",
      "desc": "<span id=\"action-sleepwalker-daydream-trance\"></span><p><strong>Источник</strong>: Dark Archive pg. 206</p><hr class=\"docutils\"><p>Вы впадаете в полудремотный транс.\nОн длится 1 минуту или до тех пор, пока вы не окажетесь <span class=\"c-unconscious\">без сознания</span>, в зависимости от того, что наступит раньше.\nВы можете добровольно выйти из транса, выполнив одиночное действие с признаком <span class=\"t-concentrate\">концентрация</span> и совершив успешный спасбросок Воли против вашего КС класса или КС заклинания, в зависимости от того, что больше.\nКак только транс завершается, вы не можете снова войти в \"Грезящий транс\" 1 минуту.\nПока вы находитесь в трансе, вы получаете следующие эффекты.</p><ul class=\"simple\">\n<li><p>Вы получаете бонус состояния +1 к спасброскам Воли. Этот бонус увеличивается до +2 против <span class=\"t-mental\">ментальных</span> эффектов. Если вы легендарны в Оккультизме, бонус против <span class=\"t-mental\">ментальных</span> эффектов увеличивается до +3.</p></li>\n<li><p>Вы получаете штраф -1 к проверкам Восприятия и броскам инициативы.</p></li>\n</ul>",
      "src": "",
      "originalName": "Daydream Trance",
      "action": "одиночное действие",
      "id": "action-sleepwalker-daydream-trance"
  },
  {
      "fullName": "Изменить фокус обычая (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=475\">Change Tradition Focus</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Изменить фокус обычая",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-gmg-change-tradition-focus\"></span><p><strong>Требования</strong>: Вы в дуэли и обучены навыку на обычая которого вы меняете свой фокус (Аркана для <span class=\"t-arcana\">арканного</span>, Оккультизм для <span class=\"t-occult\">оккультного</span>, Природа для <span class=\"t-primal\">природного</span> или Религия для <span class=\"t-divine\">сакрального</span>)</p><p><strong>Источник</strong>: Gamemastery Guide pg. 167</p><hr class=\"docutils\"><p>Вы меняете свой фокус обычая на другой магический обычай.</p>",
      "src": "",
      "originalName": "Change Tradition Focus",
      "action": "одиночное действие",
      "id": "action-gmg-change-tradition-focus"
  },
  {
      "fullName": "Сосредоточиться (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=1236\">Recenter</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Сосредоточиться",
      "traits": [
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-da-recenter\"></span><p><strong>Требования</strong>: Вы участвуете в экстрасенсорной дуэли и обучены навыку, соответствующему экстрасенсорному средоточению, в которое вы переходите.</p><p><strong>Источник</strong>: Dark Archive pg. 201</p><hr class=\"docutils\"><p>Вы принимаете экстрасенсорное средоточение, соответствующее выбранной вами эмоции.\nЕсли вы уже были экстрасенсорно сосредоточены, то теряете свое старое средоточение при принятии нового.</p>",
      "src": "",
      "originalName": "Recenter",
      "action": "одиночное действие",
      "id": "action-da-recenter"
  },
  {
      "fullName": "Посадка (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=482\">Board</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Посадка",
      "traits": [
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gmg-board\"></span><p><strong>Требования</strong>: Вы находитесь рядом с точкой входа в транспортное средство, на которое пытаетесь сесть</p><p><strong>Источник</strong>: Gamemastery Guide pg. 175</p><hr class=\"docutils\"><p>Вы садитесь в транспортное средство через верх, дверь, проход или люк;\nесли вы уже находитесь в транспортном средстве, то можете использовать это действие, чтобы высадиться в пустом пространстве рядом с точкой входа транспортного средства.\nИспользование этого действия, когда транспорт находится в движении, довольно сложно, и для этого требуется успешная проверка Акробатики или Атлетику с КС, равным КБ транспортного средства.</p>",
      "src": "",
      "originalName": "Board",
      "action": "одиночное действие",
      "id": "action-gmg-board"
  },
  {
      "fullName": "Задавить (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=484\">Run Over</a>) <img alt=\"активность из 3-х действий\" class=\"action action-3\" src=\"/PF_action_3.webp\" style=\"height: 1em;\">",
      "name": "Задавить",
      "traits": [
          "безрассудство",
          "движение"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gmg-run-over\"></span><p><strong>Требования</strong>: Вы пилотируете транспортное средство</p><p><strong>Источник</strong>: Gamemastery Guide pg. 176</p><hr class=\"docutils\"><p>Вы пытаетесь задавить существ своим транспортным средством, возможно также тараня 1 более крупное существо или объект.\nЕсли вы сохраняете контроль над транспортом, он движется вплоть до удвоенной Скорости по прямой линии своего курса.\nВы пытаетесь задавить любых существ на своем пути, которые на два или менее размера меньше транспорта, и можете попытаться протаранить на своем пути 1 целевое существо или объект, который на один или более размер меньше транспорта.</p><p>Каждое существо на вашем пути, включая таранимую цель, получает урон столкновения транспорта (простой спасбросок Рефлекса с КС столкновения транспортного средства).\nЕсли цель тарана - транспортное средство, его пилот вместо этого спасброска Рефлекса может совершить проверку пилотирования с теми же результатами.\nЕсли цель вашего тарана получает урон, то вы и ваше транспортное средство, оба получаете урон столкновения (без спасброска), и ваше движение заканчивается.</p>",
      "src": "",
      "originalName": "Run Over",
      "action": "активность из 3-х действий",
      "id": "action-gmg-run-over"
  },
  {
      "fullName": "Остановить (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=485\">Stop</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Остановить",
      "traits": [
          "воздействие"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gmg-stop\"></span><p><strong>Требования</strong>: Вы пилотируете движущееся транспортное средство</p><p><strong>Источник</strong>: Gamemastery Guide pg. 176</p><hr class=\"docutils\"><p>Вы останавливаете транспортное средство.</p>",
      "src": "",
      "originalName": "Stop",
      "action": "одиночное действие",
      "id": "action-gmg-stop"
  },
  {
      "fullName": "Взять управление (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=486\">Take Control</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Взять управление",
      "traits": [
          "воздействие"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gmg-take-control\"></span><p><strong>Требования</strong>: Вы на транспортном средстве и рядом с его управлением</p><p><strong>Источник</strong>: Gamemastery Guide pg. 176</p><hr class=\"docutils\"><p>Вы хватаетесь за вожжи, руль или другой механизм управления транспортным средством.\nВыполните проверку пилотирования; в случае успеха вы становитесь пилотом транспортного средства или восстанавливаете контроль над ним, если оно было неуправляемым.\nНекоторые транспортные средства имеют сложное управление, из-за чего это действие становится активностью из нескольких действий.</p>",
      "src": "",
      "originalName": "Take Control",
      "action": "одиночное действие",
      "id": "action-gmg-take-control"
  },
  {
      "fullName": "Выстрел (Launch) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Выстрел",
      "traits": [
          "атака"
      ],
      "rarity": "",
      "desc": "<span id=\"action-siege-weapon-launch\"></span><p><strong>Требования</strong>: Осадное орудие <a class=\"reference internal\" href=\"#siege-weapons-mounted-loading\"><span class=\"std std-ref\">Заряжено (Loaded)</span></a></p><p><strong>Источник</strong>: Guns &amp; Gears pg. 73</p><hr class=\"docutils\"><p>Осадное орудие выпускает свой снаряд, по цели или области, куда оно <a class=\"reference internal\" href=\"#siege-weapons-mounted-aiming\"><span class=\"std std-ref\">Наведено (Aimed)</span></a>.</p><ul class=\"simple\">\n<li><p><strong>Одна цель (Single Target)</strong>: Целится в существо, ничейный объект или строение в квадрате куда Наведено орудие</p></li>\n<li><p><strong>Взрыв (Burst)</strong>: Нацелено в угол сетки, куда Неведено орудие</p></li>\n<li><p><strong>Конус или линия (Cone or Line)</strong>: Направлено куда Неведено орудие</p></li>\n</ul><p>Каждое существо, ничейный объект и строение, на которое Наведено осадное орудие или которое находится в области, получает количество урона, указанное в действии Выстрел, с простым спасброском против КС указанного в блоке характеристик.\nЕсли вы обучены владению любым оружием из категории, указанной в записи мастерства осадного оружия, то можете использовать свой КС класса вместо стандартного КС спасброска орудия.\nШтраф дистанции оружия применяется к КС Выстрела, как и ваш штраф множественной атаки.\nЕсли орудие установлено на транспортном средстве, то к нему также применяются штрафы за атаку с транспортного средства во время боя (см. <a class=\"reference internal\" href=\"../game_mastering/subsystems/Vehicles.html#vehicles-in-combat\"><span class=\"std std-ref\">Транспорт в бою (Vehicles in Combat)</span></a>).\nХотя осадное орудие не требует броска атаки, действие Выстрел все равно имеет признак <span class=\"t-attack\">атака</span> и поэтому учитывается в штрафе множественной атаки.</p>",
      "src": "",
      "originalName": "Launch",
      "action": "одиночное действие",
      "id": "action-siege-weapon-launch"
  },
  {
      "fullName": "Переместить осадное орудие (Move Siege Weapon) <img alt=\"активность из 2-х действий\" class=\"action action-2\" src=\"/PF_action_2.webp\" style=\"height: 1em;\">",
      "name": "Переместить осадное орудие",
      "traits": [],
      "rarity": "",
      "desc": "<span id=\"action-siege-weapon-move\"></span><p><strong>Требования</strong>: Остальные члены орудийного расчета <a class=\"reference internal\" href=\"../playing_the_game.html#action-ready\"><span class=\"std std-ref\">Приготовились (Readied)</span></a> <a class=\"reference internal\" href=\"../playing_the_game.html#action-stride\"><span class=\"std std-ref\">Перемещаться (Stride)</span></a> по вашему приказу</p><p><strong>Источник</strong>: Guns &amp; Gears pg. 73</p><hr class=\"docutils\"><p>Вы и орудийный расчет <a class=\"reference internal\" href=\"../playing_the_game.html#action-stride\"><span class=\"std std-ref\">Перемещаетесь (Stride)</span></a>, двигая вместе с собой стационарное осадное орудие.\nМаксимальное расстояние равно Скорости самого медленного члена расчета или максимальной Скорости указанной в записи \"Переместить осадное орудие\", в зависимости от того, что меньше.\nПрицел осадного орудия перемещается на то же расстояние и в том же направлении, что и осадное орудие.</p>",
      "src": "",
      "originalName": "Move Siege Weapon",
      "action": "активность из 2-х действий",
      "id": "action-siege-weapon-move"
  },
  {
      "fullName": "Подключиться к лей-линии (<a class=\"reference external\" href=\"https://2e.aonprd.com/Actions.aspx?ID=773\">Tap Ley Line</a>) <img alt=\"одиночное действие\" class=\"action action-1\" src=\"/PF_action_1.webp\" style=\"height: 1em;\">",
      "name": "Подключиться к лей-линии",
      "traits": [
          "концентрация"
      ],
      "rarity": "",
      "desc": "<span id=\"action-gen-tap-ley-line\"></span><p><strong>Источник</strong>: Secrets of Magic pg. 215</p><p>Вы пытаетесь манипулировать магической сущностью лей-линии в пределах 30 футов, о которой вы осведомлены.\nМастер устанавливает КС основанный на сложном КС уровня лей-линии.</p><div class=\"line-block\">\n<div class=\"line\"><strong>Критический успех</strong>: Вы получаете преимущества лей-линии до конца своего следующего хода</div>\n<div class=\"line\"><strong>Успех</strong>: Вы получаете преимущества лей-линии до конца своего хода</div>\n<div class=\"line\"><strong>Провал</strong>: Вы получаете ментальный урон, равный 1d6 × уровень лей-линии. Вы не можете \"Подключаться к лей-линии\" 1 час.</div>\n<div class=\"line\"><strong>Критический провал</strong>: Как провал и вы подвергаетесь эффекту отдачи лей-линии. Вы не можете \"Подключаться к лей-линии\" 24 часа.</div>\n</div>",
      "src": "",
      "originalName": "Tap Ley Line",
      "action": "одиночное действие",
      "id": "action-gen-tap-ley-line"
  }
];
