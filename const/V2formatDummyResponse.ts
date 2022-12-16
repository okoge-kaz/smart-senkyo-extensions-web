// v2フォーマット移行時に処理プログラムが制作中であるため、一時的に使用するダミーレスポンス

import { APIResponse } from 'interfaces/APIResponse'

const personal_file_data = JSON.parse(`{
  "delete": {
    "0": "",
    "1": "delete",
    "2": "",
    "3": "deleteの日本語列名",
    "4": "",
    "5": "2nd"
  },
  "update": {
    "0": "",
    "1": "update",
    "2": "",
    "3": "updateの日本語列名",
    "4": "",
    "5": "2nd"
  },
  "import_number": {
    "0": "",
    "1": "import_number",
    "2": "",
    "3": "import_numberの日本語列名",
    "4": "890",
    "5": "8902nd"
  },
  "name": {
    "0": "",
    "1": "name",
    "2": "",
    "3": "nameの日本語列名",
    "4": "織田信長",
    "5": "織田信長2nd"
  },
  "kana": {
    "0": "",
    "1": "kana",
    "2": "",
    "3": "kanaの日本語列名",
    "4": "オダノブナガ",
    "5": "オダノブナガ2nd"
  },
  "rank": {
    "0": "",
    "1": "rank",
    "2": "",
    "3": "rankの日本語列名",
    "4": "S",
    "5": "S2nd"
  },
  "birthday": {
    "0": "",
    "1": "birthday",
    "2": "",
    "3": "birthdayの日本語列名",
    "4": "2000/06/02",
    "5": "2000/06/022nd"
  },
  "died_at": {
    "0": "",
    "1": "died_at",
    "2": "",
    "3": "died_atの日本語列名",
    "4": "2020/06/02",
    "5": "2020/06/022nd"
  },
  "age": {
    "0": "",
    "1": "age",
    "2": "",
    "3": "ageの日本語列名",
    "4": "20",
    "5": "202nd"
  },
  "gender": {
    "0": "",
    "1": "gender",
    "2": "",
    "3": "genderの日本語列名",
    "4": "男性",
    "5": "男性2nd"
  },
  "memo": {
    "0": "",
    "1": "memo",
    "2": "",
    "3": "memoの日本語列名",
    "4": "沈黙",
    "5": "沈黙2nd"
  },
  "family_id": {
    "0": "",
    "1": "family_id",
    "2": "",
    "3": "family_idの日本語列名",
    "4": "",
    "5": "2nd"
  },
  "introduced_id": {
    "0": "",
    "1": "introduced_id",
    "2": "",
    "3": "introduced_idの日本語列名",
    "4": "",
    "5": "2nd"
  },
  "company_id": {
    "0": "",
    "1": "company_id",
    "2": "",
    "3": "company_idの日本語列名",
    "4": "c1/営業部長,c2/団長",
    "5": "c1/営業部長,c2/団長2nd"
  },
  "zipcode1": {
    "0": "",
    "1": "zipcode1",
    "2": "",
    "3": "zipcode1の日本語列名",
    "4": "279-0031",
    "5": "279-00312nd"
  },
  "prefecture": {
    "0": "",
    "1": "prefecture",
    "2": "",
    "3": "prefectureの日本語列名",
    "4": "千葉県",
    "5": "千葉県2nd"
  },
  "address1": {
    "0": "",
    "1": "address1",
    "2": "",
    "3": "address1の日本語列名",
    "4": "浦安市",
    "5": "浦安市2nd"
  },
  "address2": {
    "0": "",
    "1": "address2",
    "2": "",
    "3": "address2の日本語列名",
    "4": "舞浜",
    "5": "舞浜2nd"
  },
  "address3": {
    "0": "",
    "1": "address3",
    "2": "",
    "3": "address3の日本語列名",
    "4": "１−１３",
    "5": "１−１３2nd"
  },
  "address4": {
    "0": "",
    "1": "address4",
    "2": "",
    "3": "address4の日本語列名",
    "4": "シンデレラ城",
    "5": "シンデレラ城2nd"
  },
  "address5": {
    "0": "",
    "1": "address5",
    "2": "",
    "3": "address5の日本語列名",
    "4": "102",
    "5": "1022nd"
  },
  "send_type": {
    "0": "",
    "1": "send_type",
    "2": "",
    "3": "send_typeの日本語列名",
    "4": "所属する組織",
    "5": "所属する組織2nd"
  },
  "zipcode2": {
    "0": "",
    "1": "zipcode2",
    "2": "",
    "3": "zipcode2の日本語列名",
    "4": "279-0031",
    "5": "279-00312nd"
  },
  "alt_prefecture": {
    "0": "",
    "1": "alt_prefecture",
    "2": "",
    "3": "alt_prefectureの日本語列名",
    "4": "千葉県",
    "5": "千葉県2nd"
  },
  "alt_address1": {
    "0": "",
    "1": "alt_address1",
    "2": "",
    "3": "alt_address1の日本語列名",
    "4": "浦安市",
    "5": "浦安市2nd"
  },
  "alt_address2": {
    "0": "",
    "1": "alt_address2",
    "2": "",
    "3": "alt_address2の日本語列名",
    "4": "舞浜",
    "5": "舞浜2nd"
  },
  "alt_address3": {
    "0": "",
    "1": "alt_address3",
    "2": "",
    "3": "alt_address3の日本語列名",
    "4": "１−１３",
    "5": "１−１３2nd"
  },
  "alt_address4": {
    "0": "",
    "1": "alt_address4",
    "2": "",
    "3": "alt_address4の日本語列名",
    "4": "シンデレラ城",
    "5": "シンデレラ城2nd"
  },
  "alt_address5": {
    "0": "",
    "1": "alt_address5",
    "2": "",
    "3": "alt_address5の日本語列名",
    "4": "102",
    "5": "1022nd"
  },
  "tel1": {
    "0": "",
    "1": "tel1",
    "2": "",
    "3": "tel1の日本語列名",
    "4": "08087225330",
    "5": "080872253302nd"
  },
  "tel2": {
    "0": "",
    "1": "tel2",
    "2": "",
    "3": "tel2の日本語列名",
    "4": "",
    "5": "2nd"
  },
  "fax": {
    "0": "",
    "1": "fax",
    "2": "",
    "3": "faxの日本語列名",
    "4": "08087225330",
    "5": "080872253302nd"
  },
  "email": {
    "0": "",
    "1": "email",
    "2": "",
    "3": "emailの日本語列名",
    "4": "asuka100@icloud.com",
    "5": "asuka100@icloud.com2nd"
  },
  "url": {
    "0": "",
    "1": "url",
    "2": "",
    "3": "urlの日本語列名",
    "4": "https://www.google.com/search?q=%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC+%E4%BD%8F%E6%89%80&sxsrf=ALiCzsaEoozjDqflG-sEvjE0p-zCdGQL-Q%3A1669031889820&ei=0Wd7Y83BMceU-AaeqY-QCw&ved=0ahUKEwiN7qSnnL_7AhVHCt4KHZ7UA7IQ4dUDCBA&uact=5&oq=%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC+%E4%BD%8F%E6%89%80&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQA0oECEEYAEoECEYYAFAAWABgAGgAcAB4AIABAIgBAJIBAJgBAA&sclient=gws-wiz-serp&ludocid=4703760703938833701",
    "5": "https://www.google.com/search?q=%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC+%E4%BD%8F%E6%89%80&sxsrf=ALiCzsaEoozjDqflG-sEvjE0p-zCdGQL-Q%3A1669031889820&ei=0Wd7Y83BMceU-AaeqY-QCw&ved=0ahUKEwiN7qSnnL_7AhVHCt4KHZ7UA7IQ4dUDCBA&uact=5&oq=%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC+%E4%BD%8F%E6%89%80&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQA0oECEEYAEoECEYYAFAAWABgAGgAcAB4AIABAIgBAJIBAJgBAA&sclient=gws-wiz-serp&ludocid=47037607039388337012nd"
  },
  "is_member": {
    "0": "",
    "1": "is_member",
    "2": "",
    "3": "is_memberの日本語列名",
    "4": "TRUE",
    "5": "TRUE2nd"
  },
  "date_of_join": {
    "0": "",
    "1": "date_of_join",
    "2": "",
    "3": "date_of_joinの日本語列名",
    "4": "1998/1/1",
    "5": "1998/1/12nd"
  },
  "date_of_expiry": {
    "0": "",
    "1": "date_of_expiry",
    "2": "",
    "3": "date_of_expiryの日本語列名",
    "4": "1997/12/31",
    "5": "1997/12/312nd"
  },
  "tag1": {
    "0": "",
    "1": "tag1",
    "2": "",
    "3": "tag1の日本語列名",
    "4": "タグ1の内容",
    "5": "タグ1の内容2nd"
  },
  "tag34": {
    "0": "",
    "1": "tag34",
    "2": "",
    "3": "tag34の日本語列名",
    "4": "タグ34の内容",
    "5": "タグ34の内容2nd"
  },
  "tag50": {
    "0": "",
    "1": "tag50",
    "2": "",
    "3": "tag50の日本語列名",
    "4": "タグ50の内容",
    "5": "タグ50の内容2nd"
  }        
}`)

const company_file_data = JSON.parse(`{
  "delete": {
    "0": "",
    "1": "delete",
    "2": "",
    "3": "deleteの日本語列名",
    "4": "",
    "5": "2nd"
  },
  "update": {
    "0": "",
    "1": "update",
    "2": "",
    "3": "updateの日本語列名",
    "4": "",
    "5": "2nd"
  },
  "import_number": {
    "0": "",
    "1": "import_number",
    "2": "",
    "3": "import_numberの日本語列名",
    "4": "c1",
    "5": "c12nd"
  },
  "name": {
    "0": "",
    "1": "name",
    "2": "",
    "3": "nameの日本語列名",
    "4": "サイバーエージェント",
    "5": "サイバーエージェント2nd"
  },
  "kana": {
    "0": "",
    "1": "kana",
    "2": "",
    "3": "kanaの日本語列名",
    "4": "サイバーエージェント",
    "5": "サイバーエージェント2nd"
  },
  "rank": {
    "0": "",
    "1": "rank",
    "2": "",
    "3": "rankの日本語列名",
    "4": "S",
    "5": "S2nd"
  },
  "memo": {
    "0": "",
    "1": "memo",
    "2": "",
    "3": "memoの日本語列名",
    "4": "",
    "5": "2nd"
  },
  "company_zipcode": {
    "0": "",
    "1": "company_zipcode",
    "2": "",
    "3": "company_zipcodeの日本語列名",
    "4": "279-0031",
    "5": "279-00312nd"
  },
  "company_prefecture": {
    "0": "",
    "1": "company_prefecture",
    "2": "",
    "3": "company_prefectureの日本語列名",
    "4": "千葉県",
    "5": "千葉県2nd"
  },
  "company_address1": {
    "0": "",
    "1": "company_address1",
    "2": "",
    "3": "company_address1の日本語列名",
    "4": "浦安市",
    "5": "浦安市2nd"
  },
  "company_address2": {
    "0": "",
    "1": "company_address2",
    "2": "",
    "3": "company_address2の日本語列名",
    "4": "舞浜",
    "5": "舞浜2nd"
  },
  "company_address3": {
    "0": "",
    "1": "company_address3",
    "2": "",
    "3": "company_address3の日本語列名",
    "4": "1-13",
    "5": "1-132nd"
  },
  "company_address4": {
    "0": "",
    "1": "company_address4",
    "2": "",
    "3": "company_address4の日本語列名",
    "4": "シンデレラ城",
    "5": "シンデレラ城2nd"
  },
  "company_address5": {
    "0": "",
    "1": "company_address5",
    "2": "",
    "3": "company_address5の日本語列名",
    "4": "102",
    "5": "1022nd"
  },
  "send_type": {
    "0": "",
    "1": "send_type",
    "2": "",
    "3": "send_typeの日本語列名",
    "4": "所属する組織",
    "5": "所属する組織2nd"
  },
  "company_zipcode2": {
    "0": "",
    "1": "company_zipcode2",
    "2": "",
    "3": "company_zipcode2の日本語列名",
    "4": "279-0031",
    "5": "279-00312nd"
  },
  "alt_company_prefecture": {
    "0": "",
    "1": "alt_company_prefecture",
    "2": "",
    "3": "alt_company_prefectureの日本語列名",
    "4": "千葉県",
    "5": "千葉県2nd"
  },
  "alt_company_address1": {
    "0": "",
    "1": "alt_company_address1",
    "2": "",
    "3": "alt_company_address1の日本語列名",
    "4": "浦安市",
    "5": "浦安市2nd"
  },
  "alt_company_address2": {
    "0": "",
    "1": "alt_company_address2",
    "2": "",
    "3": "alt_company_address2の日本語列名",
    "4": "舞浜",
    "5": "舞浜2nd"
  },
  "alt_company_address3": {
    "0": "",
    "1": "alt_company_address3",
    "2": "",
    "3": "alt_company_address3の日本語列名",
    "4": "1-13",
    "5": "1-132nd"
  },
  "alt_company_address4": {
    "0": "",
    "1": "alt_company_address4",
    "2": "",
    "3": "alt_company_address4の日本語列名",
    "4": "シンデレラ城",
    "5": "シンデレラ城2nd"
  },
  "alt_company_address5": {
    "0": "",
    "1": "alt_company_address5",
    "2": "",
    "3": "alt_company_address5の日本語列名",
    "4": "102",
    "5": "1022nd"
  },
  "company_tel": {
    "0": "",
    "1": "company_tel",
    "2": "",
    "3": "company_telの日本語列名",
    "4": "08087225330",
    "5": "080872253302nd"
  },
  "company_tel2": {
    "0": "",
    "1": "company_tel2",
    "2": "",
    "3": "company_tel2の日本語列名",
    "4": "",
    "5": "2nd"
  },
  "company_fax": {
    "0": "",
    "1": "company_fax",
    "2": "",
    "3": "company_faxの日本語列名",
    "4": "08087225330",
    "5": "080872253302nd"
  },
  "email": {
    "0": "",
    "1": "email",
    "2": "",
    "3": "emailの日本語列名",
    "4": "asuka100@icloud.com",
    "5": "asuka100@icloud.com2nd"
  },
  "company_url": {
    "0": "",
    "1": "company_url",
    "2": "",
    "3": "company_urlの日本語列名",
    "4": "https://www.google.com/search?q=%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC+%E4%BD%8F%E6%89%80&sxsrf=ALiCzsaEoozjDqflG-sEvjE0p-zCdGQL-Q%3A1669031889820&ei=0Wd7Y83BMceU-AaeqY-QCw&ved=0ahUKEwiN7qSnnL_7AhVHCt4KHZ7UA7IQ4dUDCBA&uact=5&oq=%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC+%E4%BD%8F%E6%89%80&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQA0oECEEYAEoECEYYAFAAWABgAGgAcAB4AIABAIgBAJIBAJgBAA&sclient=gws-wiz-serp&ludocid=4703760703938833701",
    "5": "https://www.google.com/search?q=%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC+%E4%BD%8F%E6%89%80&sxsrf=ALiCzsaEoozjDqflG-sEvjE0p-zCdGQL-Q%3A1669031889820&ei=0Wd7Y83BMceU-AaeqY-QCw&ved=0ahUKEwiN7qSnnL_7AhVHCt4KHZ7UA7IQ4dUDCBA&uact=5&oq=%E3%83%87%E3%82%A3%E3%82%BA%E3%83%8B%E3%83%BC+%E4%BD%8F%E6%89%80&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQA0oECEEYAEoECEYYAFAAWABgAGgAcAB4AIABAIgBAJIBAJgBAA&sclient=gws-wiz-serp&ludocid=47037607039388337012nd"
  },
  "tag50": {
    "0": "",
    "1": "tag50",
    "2": "",
    "3": "将来性",
    "4": "S+",
    "5": "C-"
  }
}`)

const invalid_file_data = JSON.parse(`{
  "lkj": {
    "0": "",
    "1": "lkj",
    "2": "",
    "3": "適当な名前",
    "4": ""
  },
  "prize": {
      "0": "",
      "1": "prize",
      "2": "",
      "3": "称号",
      "4": "栄誉賞"
  },
  "tag1": {
    "0": "",
    "1": "tag1",
    "2": "",
    "3": "特記事項",
    "4": "イケメン"
  }
}`)

export const V2formatDummyResponse:APIResponse = {
  "personal_data": [
    {
      "file_name": "test.csv",
      "file_data": personal_file_data
    }
  ],
  "company_data": [
    {
      "file_name": "test.csv",
      "file_data": company_file_data
    }
  ],
  "invalid_data": [
    {
      "file_name": "test.csv",
      "file_data": invalid_file_data
    }
  ]
}
