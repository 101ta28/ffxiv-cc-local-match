<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <v-alert v-if="alertMessage" type="error" dismissible>
        {{ alertMessage }}
      </v-alert>

      <div class="py-3" />

      <h3 class="text-h4 font-weight-bold">はじめに、データの入力をしましょう</h3>

      <div class="py-7" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="4">
          <v-select v-model="inputJob" :items="jobList" label="ジョブ" outlined />
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="userName" label="キャラクター名" outlined />
        </v-col>
        <v-col cols="4">
          <v-select v-model="inputRank" :items="rankList" label="階級" outlined />
        </v-col>
      </v-row>
      <!-- データ追加ボタンを作り、押すと下にテーブルを表示させる -->
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn color="primary" min-width="228" size="x-large" variant="flat" @click="addItem">
            <v-icon icon="mdi-plus" size="large" start />
            データ追加
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="success" min-width="228" size="x-large" variant="flat" @click="createMatch">
            <v-icon icon="mdi-sword-cross" size="large" start />
            対戦を開始
          </v-btn>
        </v-col>
      </v-row>
      <v-table class="elevation-1">
        <thead>
          <tr>
            <th class="text-center">
            </th>
            <th class="text-center">
              ジョブ
            </th>
            <th class="text-center">
              キャラクター名
            </th>
            <th class="text-center">
              階級
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in Object.entries(items)" :key="key">
            <td>
              <v-btn color="error" icon variant="flat" @click="deleteItem(item[0])">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </td>
            <td>{{ item[1].result[0].job }}</td>
            <td>{{ item[0] }}</td>
            <td>{{ item[1].rank }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { db } from '@/firebase';
import { computed, ref } from 'vue';

const inputJob = ref('');
const userName = ref('');
const inputRank = ref('');

const alertMessage = ref('');

const jobList = ref([
  "ナイト",
  "戦士",
  "暗黒騎士",
  "ガンブレイカー",
  "白魔道士",
  "学者",
  "占星術師",
  "賢者",
  "モンク",
  "竜騎士",
  "忍者",
  "侍",
  "リーパー",
  "吟遊詩人",
  "機工士",
  "踊り子",
  "召喚士",
  "赤魔道士",
  "黒魔道士"
]);

const rankList = ref([
  "ブロンズ",
  "シルバー",
  "ゴールド",
  "プラチナ",
  "ダイヤモンド",
  "クリスタル"
]);

// たぶん使わない
// const jobObj = ref(
//   {
//     "ナイト": "PLD",
//     "戦士": "WAR",
//     "暗黒騎士": "DRK",
//     "ガンブレイカー": "GNB",
//     "白魔道士": "WHM",
//     "学者": "SCH",
//     "占星術師": "AST",
//     "賢者": "SGE",
//     "モンク": "MNK",
//     "竜騎士": "DRG",
//     "忍者": "NIN",
//     "侍": "SAM",
//     "リーパー": "RPR",
//     "吟遊詩人": "BRD",
//     "機工士": "MCH",
//     "踊り子": "DNC",
//     "召喚士": "SMN",
//     "赤魔道士": "RDM",
//     "黒魔道士": "BLM",
//   }
// );

const itemTemplate = computed(() => {
  return {
    [userName.value]: {
      rank: inputRank.value,
      'winning point': 0,
      result: [
        {
          job: inputJob.value,
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
  };
});

// const items = ref({});
const items = ref(
  {
    'Test 1': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
    'Test 2': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
    'Test 3': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
    'Test 4': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
    'Test 5': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
    'Test 6': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
    'Test 7': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
    'Test 8': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
    'Test 9': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
    'Test 10': {
      rank: 'ブロンズ',
      'winning point': 0,
      result: [
        {
          job: 'BLM',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
  }
);

const addItem = () => {
  // 全データが入力されているかチェック
  if (!inputJob.value || !userName.value || !inputRank.value) {
    alertMessage.value = '全ての項目を入力してください';
    setTimeout(() => {
      alertMessage.value = "";
    }, 10000);
    return;
  }
  // items.value = { ...items.value, ...itemTemplate.value };
  items.value = Object.assign({}, items.value, itemTemplate.value);
  // データリセット
  inputJob.value = '';
  userName.value = '';
  inputRank.value = '';
  console.log(items.value);
};

const deleteItem = (key) => {
  delete items.value[key];
};

// firebaseにデータを追加する
// コレクションはmatchsでドキュメントIDは自動
const createMatch = () => {
  db.collection('matchs')
    .add({
      items: items.value,
    })
    .then(() => {
      alertMessage.value = 'データを追加しました';
      setTimeout(() => {
        alertMessage.value = "";
      }, 10000);
    })
    .catch((error) => {
      alertMessage.value = 'データの追加に失敗しました';
      setTimeout(() => {
        alertMessage.value = "";
      }, 10000);
      console.error('Error adding document: ', error);
    });
};

</script>
