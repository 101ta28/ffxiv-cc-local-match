<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <h3 class="text-h4 font-weight-bold">はじめに、データの入力をしましょう</h3>

      <div class="py-7" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="3">
          <v-select v-model="inputJob" :items="jobList" label="ジョブ" outlined />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="userName" label="キャラクター名" outlined />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputWorld" label="ホームワールド" outlined />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputRank" label="階級" outlined />
        </v-col>
      </v-row>
      <!-- データ追加ボタンを作り、押すと下にテーブルを表示させる -->
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn color="primary" min-width="228" size="x-large" variant="flat">
            <v-icon icon="mdi-plus" size="large" start @click="addItem" />
            データ追加
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="success" min-width="228" size="x-large" variant="flat">
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
              ホームワールド
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
            <td>{{ item[1].world }}</td>
            <td>{{ item[1].rank }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';

const inputJob = ref('');
const userName = ref('');
const inputWorld = ref('');
const inputRank = ref('');

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
  "吟遊詩人",
  "機工士",
  "踊り子",
  "黒魔道士",
  "召喚士",
  "赤魔道士"
]);

const itemTemplate = computed(() => {
  return {
    [userName.value]: {
      rank: inputRank.value,
      world: inputWorld.value,
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

const items = ref({
  'Ayuto 1': {
    rank: 'ブロンズ',
    world: 'Ridill',
    'winning point': 1,
    result: [
      {
        job: 'BLM',
        team: 'astra',
        k: '1',
        d: '1',
        a: '4',
      },
      {
        job: 'NIN',
        team: 'umbra',
        k: '3',
        d: '2',
        a: '3',
      },
    ],
  },
  'Ayuto 2': {
    rank: 'ブロンズ',
    world: 'Ridill',
    'winning point': 1,
    result: [
      {
        job: 'BLM',
        team: 'umbra',
        k: '1',
        d: '1',
        a: '4',
      },
      {
        job: 'BLM',
        team: 'astra',
        k: '3',
        d: '2',
        a: '3',
      },
    ],
  },
});

const addItem = () => {
  items.value = { ...items.value, ...itemTemplate.value };
  // データリセット
  inputJob.value = '';
  userName.value = '';
  inputWorld.value = '';
  inputRank.value = '';
  console.log(items.value);
};

const deleteItem = (key) => {
  delete items.value[key];
};
</script>
