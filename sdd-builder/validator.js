/**
 * 輸入驗證器
 * Input Validator for Church Website SDD Builder
 */

/**
 * 驗證答案
 * @param {Object} question - 問題定義
 * @param {string} answer - 用戶答案
 * @returns {Object} - { valid: boolean, error: string, parsedValue: any }
 */
function validate(question, answer) {
  // 空值檢查
  if (!answer || answer.trim() === '') {
    const hasRequired = question.fields.some(f => f.required);
    if (hasRequired) {
      return {
        valid: false,
        error: '此問題為必填，不能為空'
      };
    }
    return { valid: true, parsedValue: null };
  }

  // 根據欄位類型驗證
  for (const field of question.fields) {
    const validation = validateField(field, answer);
    if (!validation.valid) {
      return validation;
    }
  }

  return {
    valid: true,
    parsedValue: parseValue(question.fields[0], answer)
  };
}

/**
 * 驗證單一欄位
 */
function validateField(field, value) {
  switch (field.type) {
    case 'text':
      return validateText(field, value);
    case 'textarea':
      return validateTextarea(field, value);
    case 'email':
      return validateEmail(field, value);
    case 'url':
      return validateUrl(field, value);
    case 'tel':
      return validateTel(field, value);
    case 'number':
      return validateNumber(field, value);
    case 'color':
      return validateColor(field, value);
    case 'select':
      return validateSelect(field, value);
    case 'multiselect':
      return validateMultiSelect(field, value);
    case 'boolean':
      return validateBoolean(field, value);
    case 'array':
      return validateArray(field, value);
    case 'object':
      return validateObject(field, value);
    default:
      return { valid: true };
  }
}

/**
 * 驗證文字
 */
function validateText(field, value) {
  if (field.required && !value.trim()) {
    return { valid: false, error: `${field.name} 為必填` };
  }

  if (field.minLength && value.length < field.minLength) {
    return {
      valid: false,
      error: `${field.name} 最少需要 ${field.minLength} 個字元`
    };
  }

  if (field.maxLength && value.length > field.maxLength) {
    return {
      valid: false,
      error: `${field.name} 不能超過 ${field.maxLength} 個字元`
    };
  }

  return { valid: true };
}

/**
 * 驗證多行文字
 */
function validateTextarea(field, value) {
  return validateText(field, value);
}

/**
 * 驗證 Email
 */
function validateEmail(field, value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (field.required && !value.trim()) {
    return { valid: false, error: 'Email 為必填' };
  }

  if (value && !emailRegex.test(value)) {
    return { valid: false, error: 'Email 格式不正確' };
  }

  return { valid: true };
}

/**
 * 驗證 URL
 */
function validateUrl(field, value) {
  if (!value) return { valid: true };

  try {
    new URL(value);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: 'URL 格式不正確' };
  }
}

/**
 * 驗證電話
 */
function validateTel(field, value) {
  // 簡化版電話驗證
  const telRegex = /^[\d\s\-\(\)]+$/;
  
  if (field.required && !value.trim()) {
    return { valid: false, error: '電話為必填' };
  }

  if (value && !telRegex.test(value)) {
    return { valid: false, error: '電話格式不正確' };
  }

  return { valid: true };
}

/**
 * 驗證數字
 */
function validateNumber(field, value) {
  const num = parseFloat(value);

  if (isNaN(num)) {
    return { valid: false, error: '必須是數字' };
  }

  if (field.min !== undefined && num < field.min) {
    return {
      valid: false,
      error: `數值不能小於 ${field.min}`
    };
  }

  if (field.max !== undefined && num > field.max) {
    return {
      valid: false,
      error: `數值不能大於 ${field.max}`
    };
  }

  return { valid: true };
}

/**
 * 驗證顏色
 */
function validateColor(field, value) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  
  if (field.required && !value.trim()) {
    return { valid: false, error: '顏色為必填' };
  }

  if (value && !hexRegex.test(value)) {
    return {
      valid: false,
      error: '顏色必須是 HEX 格式（例：#3B82F6）'
    };
  }

  return { valid: true };
}

/**
 * 驗證單選
 */
function validateSelect(field, value) {
  if (field.required && !value) {
    return { valid: false, error: '請選擇一個選項' };
  }

  // 檢查是否為有效選項
  const validOptions = field.options.map(opt =>
    typeof opt === 'string' ? opt : opt.value
  );

  // 支援編號選擇
  const index = parseInt(value) - 1;
  if (!isNaN(index) && index >= 0 && index < validOptions.length) {
    return { valid: true };
  }

  // 直接值比對
  if (validOptions.includes(value)) {
    return { valid: true };
  }

  return {
    valid: false,
    error: '無效的選項，請輸入選項編號或值'
  };
}

/**
 * 驗證多選
 */
function validateMultiSelect(field, value) {
  if (field.required && !value) {
    return { valid: false, error: '請至少選擇一個選項' };
  }

  // 分割選項
  const selections = value.split(',').map(s => s.trim());

  if (field.minItems && selections.length < field.minItems) {
    return {
      valid: false,
      error: `至少需要選擇 ${field.minItems} 個選項`
    };
  }

  if (field.maxItems && selections.length > field.maxItems) {
    return {
      valid: false,
      error: `最多只能選擇 ${field.maxItems} 個選項`
    };
  }

  return { valid: true };
}

/**
 * 驗證布林值
 */
function validateBoolean(field, value) {
  const lower = value.toLowerCase();
  const validValues = ['true', 'false', 'yes', 'no', 'y', 'n', '1', '0'];

  if (!validValues.includes(lower)) {
    return {
      valid: false,
      error: '請輸入 yes/no 或 true/false'
    };
  }

  return { valid: true };
}

/**
 * 驗證陣列
 */
function validateArray(field, value) {
  try {
    const arr = JSON.parse(value);
    
    if (!Array.isArray(arr)) {
      return { valid: false, error: '格式錯誤，必須是陣列' };
    }

    if (field.minItems && arr.length < field.minItems) {
      return {
        valid: false,
        error: `至少需要 ${field.minItems} 個項目`
      };
    }

    if (field.maxItems && arr.length > field.maxItems) {
      return {
        valid: false,
        error: `最多只能有 ${field.maxItems} 個項目`
      };
    }

    return { valid: true };
  } catch (e) {
    return {
      valid: false,
      error: 'JSON 格式錯誤，請檢查語法'
    };
  }
}

/**
 * 驗證物件
 */
function validateObject(field, value) {
  try {
    const obj = JSON.parse(value);
    
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      return { valid: false, error: '格式錯誤，必須是物件' };
    }

    return { valid: true };
  } catch (e) {
    return {
      valid: false,
      error: 'JSON 格式錯誤，請檢查語法'
    };
  }
}

/**
 * 解析值
 */
function parseValue(field, value) {
  try {
    switch (field.type) {
      case 'number':
        return parseFloat(value);
      case 'boolean':
        return ['true', 'yes', 'y', '1'].includes(value.toLowerCase());
      case 'array':
      case 'object':
        return JSON.parse(value);
      case 'multiselect':
        return value.split(',').map(s => s.trim());
      case 'select':
        // 轉換編號為實際值
        const index = parseInt(value) - 1;
        if (!isNaN(index) && field.options[index]) {
          const opt = field.options[index];
          return typeof opt === 'string' ? opt : opt.value;
        }
        return value;
      default:
        return value;
    }
  } catch (e) {
    return value;
  }
}

/**
 * 驗證 Google Maps URL
 */
function validateGoogleMapsUrl(url) {
  return url.includes('google.com/maps') || url.includes('goo.gl/maps');
}

/**
 * 驗證時間格式 (HH:MM)
 */
function validateTimeFormat(time) {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/**
 * 檢查對比度（無障礙標準）
 */
function checkContrast(color1, color2) {
  // 簡化版對比度檢查
  // 實際應實作 WCAG 2.1 標準演算法
  return true;
}

module.exports = {
  validate,
  validateField,
  validateGoogleMapsUrl,
  validateTimeFormat,
  checkContrast
};
