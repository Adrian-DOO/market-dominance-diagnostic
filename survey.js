function submitSurvey() {
  let total = 0;
  for (let i = 1; i <= 15; i++) {
    const selected = document.querySelector(`input[name=q${i}]:checked`);
    if (selected) {
      total += parseInt(selected.value);
    }
  }

  const score = Math.round((total / 75) * 100);
  showResult(score);
}

function showResult(score) {
  const resultBox = document.getElementById("result-box");
  const title = document.getElementById("result-title");
  const message = document.getElementById("result-message");

  document.getElementById("survey").style.display = "none";
  resultBox.style.display = "block";

  if (score >= 90) {
    title.innerText = "🏆 독점 완성";
    message.innerText = "강력한 시장 지배력을 갖춘 상태입니다. 확장 전략을 검토해보세요.";
  } else if (score >= 75) {
    title.innerText = "🚀 독점 근접";
    message.innerText = "조금만 보완하면 시장에서 독점적 입지를 가질 수 있습니다.";
  } else if (score >= 60) {
    title.innerText = "🛠 독점 시작";
    message.innerText = "기초 전략은 갖췄지만, 차별화 시스템이 더 필요합니다.";
  } else if (score >= 40) {
    title.innerText = "🔄 독점 준비";
    message.innerText = "경쟁 시장에 머물러 있습니다. 재정비가 필요합니다.";
  } else {
    title.innerText = "🆘 치열 경쟁";
    message.innerText = "경쟁 속에 파묻혀 있습니다. 전면적인 리포지셔닝이 필요합니다.";
  }
}
