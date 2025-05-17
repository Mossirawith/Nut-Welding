
    function checkCode() {
      const input = document.getElementById("codeInput").value.trim();
      const classCell = document.getElementById("classCell");
      const threadCell = document.getElementById("threadCell");
      const typeCell = document.getElementById("typeCell");
      const descCell = document.getElementById("descCell");

      const data = {
        "02054": ["Class 2", "4T", "Coarse thread", "Width across flat of standard type"],
        "02014": ["Class 2", "4T", "Coarse thread", "Width across flat of standard type"],
        "02052": ["Class 3", "4T", "Coarse thread", "Width across flat of standard type"],
        "02012": ["Class 3", "4T", "Coarse thread", "Width across flat of standard type"],
        "02056": ["Class 2", "6T", "Coarse thread", "Width across flat of standard type"],
        "02074": ["Class 2", "4T", "Fine thread", "Width across flat of standard type"],
        "02018": ["Class 2", "4T", "Fine thread", "Width across flat of standard type"],
        "02072": ["Class 3", "4T", "Fine thread", "Width across flat of standard type"],
        "02016": ["Class 3", "4T", "Fine thread", "Width across flat of standard type"],
        "02076": ["Class 2", "6T", "Fine thread", "Width across flat of standard type"],
        "02114": ["Class 2", "4T", "Coarse thread", "Width across flat of small type"],
        "02154": ["Class 2", "4T", "Coarse thread", "Width across flat of small type"],
        "02112": ["Class 3", "4T", "Coarse thread", "Width across flat of small type"],
        "02152": ["Class 3", "4T", "Coarse thread", "Width across flat of small type"],
        "02156": ["Class 2", "6T", "Coarse thread", "Width across flat of small type"],
        "02118": ["Class 2", "4T", "Fine thread", "Width across flat of small type"],
        "02174": ["Class 2", "4T", "Fine thread", "Width across flat of small type"],
        "02116": ["Class 3", "4T", "Fine thread", "Width across flat of small type"],
        "02172": ["Class 3", "4T", "Fine thread", "Width across flat of small type"],
        "02176": ["Class 2", "6T", "Fine thread", "Width across flat of small type"]
      };

      if (data[input]) {
        [classCell.textContent, threadCell.textContent, typeCell.textContent, descCell.textContent] = data[input];
      } else {
        classCell.textContent = "-";
        threadCell.textContent = "-";
        typeCell.textContent = "-";
        descCell.textContent = "-";
      }

      checkTailCode();
    }

    function checkTailCode() {
      const tailInput = document.getElementById("codeInputTail").value.trim();
      const typeCell = document.getElementById("typeCell").textContent.trim();
      const descCell = document.getElementById("descCell").textContent.trim();
      const nominalCell = document.getElementById("nominalCell");
      const pitchCell = document.getElementById("pitchCell");
      const widthCell = document.getElementById("widthCell");
      const resultCell = document.getElementById("resultCell");
      const finalCell = document.getElementById("finalCell");

      const coarseMap = {
        "002": "M2", "003": "M3", "004": "M4", "005": "M5", "006": "M6",
        "008": "M8", "010": "M10", "012": "M12", "014": "M14",
        "016": "M16", "018": "M18", "020": "M20", "022": "M22"
      };

      const coarsePitchMap = {
        "002": "0.4", "003": "0.5", "004": "0.7", "005": "0.8", "006": "1.0",
        "008": "1.25", "010": "1.5", "012": "1.75", "014": "2.0",
        "016": "2.0", "018": "2.5", "020": "2.5", "022": "2.5"
      };

      const fineMap = {
        "008": "M8x1", "010": "M10x1.25", "012": "M12x1.25",
        "014": "M14x1.5", "016": "M16x1.5", "018": "M18x1.5",
        "020": "M20x1.5", "022": "M22x1.5"
      };

      const finePitchMap = {
        "008": "1", "010": "1.25", "012": "1.25",
        "014": "1.5", "016": "1.5", "018": "1.5",
        "020": "1.5", "022": "1.5"
      };

      const widthMap = {
        "002": "4", "003": "5.5", "004": "7", "005": "8", "006": "10",
        "008": "13", "010": "17", "012": "19", "014": "22",
        "016": "24", "018": "27", "020": "30", "022": "32"
      };

      const widthSmallMap = {
        "002": "2", "003": "3", "004": "4", "005": "5", "006": "6",
        "008": "12", "010": "14", "012": "17", "014": "19",
        "016": "21", "018": "24", "020": "27", "022": "30"
      };

      const fineExcluded = ["002", "003", "004", "005", "006"];

      if (typeCell === "Fine thread") {
        if (fineExcluded.includes(tailInput)) {
          nominalCell.textContent = "-";
          pitchCell.textContent = "-";
        } else if (fineMap[tailInput]) {
          nominalCell.textContent = fineMap[tailInput];
          pitchCell.textContent = finePitchMap[tailInput] || "-";
        } else {
          nominalCell.textContent = "-";
          pitchCell.textContent = "-";
        }
      } else if (typeCell === "Coarse thread" && coarseMap[tailInput]) {
        nominalCell.textContent = coarseMap[tailInput];
        pitchCell.textContent = coarsePitchMap[tailInput] || "-";
      } else {
        nominalCell.textContent = "-";
        pitchCell.textContent = "-";
      }

      if (descCell === "Width across flat of standard type" && widthMap[tailInput]) {
        widthCell.textContent = widthMap[tailInput];
      } else if (descCell === "Width across flat of small type" && widthSmallMap[tailInput]) {
        widthCell.textContent = widthSmallMap[tailInput];
      } else {
        widthCell.textContent = "-";
      }

      const nominalText = nominalCell.textContent.trim();
      const pitchText = pitchCell.textContent.trim();
      const widthText = widthCell.textContent.trim();

      const mNumber = parseFloat(nominalText.replace("M", "").split("x")[0]);
      const pitchValue = parseFloat(pitchText);
      const widthValue = parseFloat(widthText);

      if (!isNaN(mNumber) && !isNaN(pitchValue)) {
  const result = mNumber - pitchValue;
  resultCell.textContent = result.toFixed(2) + " mm";

  if (!isNaN(widthValue)) {
    const final = (Math.max(result, widthValue) - Math.min(result, widthValue)) / 2;
    const finalTrunc = Math.floor(final * 100) / 100;
    finalCell.textContent = finalTrunc.toFixed(2) + " mm";
    document.getElementById("finalCellSummary").textContent = finalTrunc.toFixed(2) + " mm";
  } else {
    finalCell.textContent = "-";
    document.getElementById("finalCellSummary").textContent = "-";
  }
} else {
  resultCell.textContent = "-";
  finalCell.textContent = "-";
  document.getElementById("finalCellSummary").textContent = "-";
}

    }
  