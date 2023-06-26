<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <v-alert v-if="alertMessage" type="error" dismissible>
        {{ alertMessage }}
      </v-alert>

      <v-alert v-if="successMessage" type="success" dismissible>
        {{ successMessage }}
      </v-alert>

      <div class="py-3" />

      <h3 class="text-h4 font-weight-bold">対戦を開始しましょう</h3>

      <div class="py-7" />

      <!-- チーム選択とランダム振り分けボタン -->
      <v-row class="d-flex align-center justify-center">
        <v-col cols="4">
          <v-select v-model="selectedTeam" :items="teamList" label="チーム選択" outlined />
        </v-col>
        <v-col cols="4">
          <v-btn color="primary" @click="randomizeTeams">ランダムにチーム分け</v-btn>
        </v-col>
      </v-row>

      <!-- データ保存ボタンと試合履歴ボタン -->
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn color="success" @click="saveMatchData">試合データを保存</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="info" @click="showMatchHistory">試合履歴を見る</v-btn>
        </v-col>
      </v-row>

      <!-- 対戦キャラクター一覧テーブル -->
      <v-table class="elevation-1">
        <thead>
          <tr>
            <th class="text-center">キャラクター名</th>
            <th class="text-center">ジョブ</th>
            <th class="text-center">得点</th>
            <th class="text-center">得点調整</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(character, name, index) in Object.entries(items)" :key="index">
            <td>{{ name }}</td>
            <td>{{ character.job }}</td>
            <td>{{ character.score }}</td>
            <td>
              <v-btn color="primary" @click="incrementScore(name)">+1</v-btn>
              <v-btn color="secondary" @click="decrementScore(name)">-1</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-responsive>

    <!-- 試合履歴モーダル -->
    <v-dialog v-model="isMatchHistoryDialogOpen" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">試合履歴</span>
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">ユーザー名</th>
                <th class="text-left">チーム</th>
                <th class="text-left">得点</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="match in paginatedMatches" :key="match.id">
                <td>{{ match.user }}</td>
                <td>{{ match.team }}</td>
                <td>{{ match.score }}</td>
              </tr>
            </tbody>
          </v-simple-table>

          <v-pagination v-model="currentPage" :length="numberOfPages"></v-pagination>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isMatchHistoryDialogOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { db } from '@/firebase/firebase.js';
import { computed, ref } from 'vue';

// Firestoreからデータを取得する関数
const fetchItems = async () => {
  try {
    const response = await db.collection('items').get();
    items.value = response.docs.map(doc => doc.data());
  } catch (error) {
    alertMessage.value = 'データの取得に失敗しました: ' + error.message;
  }
};

// 初期データの取得
fetchItems();

// 定数とリアクティブな参照の定義
const alertMessage = ref(null);
const successMessage = ref(null);
const selectedTeam = ref(null);
const items = ref({});
const teamList = ref([
  { text: '選択してください', value: null },
  { text: 'アストラ', value: 'Astra' },
  { text: 'アンブラ', value: 'Umbra' }
]);

// チーム分けをランダムに行う関数
const randomizeTeams = () => {
  const keys = Object.keys(items.value);
  const half = Math.ceil(keys.length / 2);
  const shuffledKeys = keys.sort(() => Math.random() - 0.5);
  const teamAstra = shuffledKeys.slice(0, half);
  const teamUmbra = shuffledKeys.slice(half);

  teamAstra.forEach(key => items.value[key].team = 'Astra');
  teamUmbra.forEach(key => items.value[key].team = 'Umbra');
};

// 試合データを保存する関数
const saveMatchData = async () => {
  try {
    await db.collection('matches').add({
      teams: selectedTeam.value,
      items: items.value
    });
    successMessage.value = '試合データを保存しました';
  } catch (error) {
    alertMessage.value = 'データの保存に失敗しました: ' + error.message;
  }
};

// 試合履歴を表示するためのリアクティブな参照と関数
const matches = ref([]);
const isMatchHistoryDialogOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(5);

const fetchMatches = async () => {
  try {
    const response = await db.collection('matches').get();
    matches.value = response.docs.map(doc => doc.data());
  } catch (error) {
    alertMessage.value = '試合履歴の取得に失敗しました: ' + error.message;
  }
};

const showMatchHistory = () => {
  fetchMatches();
  isMatchHistoryDialogOpen.value = true;
};

const paginatedMatches = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return matches.value.slice(start, end);
});

const numberOfPages = computed(() => Math.ceil(matches.value.length / itemsPerPage.value));

// 得点を増やす関数
const incrementScore = (characterName) => {
  items.value[characterName].score++;
};

// 得点を減らす関数
const decrementScore = (characterName) => {
  if (items.value[characterName].score > 0) {
    items.value[characterName].score--;
  }
};
</script>
