import ExcelJs from 'exceljs'
import {saveAs} from 'file-saver'
export async function excelExport (obj){
    console.log('test',obj)
    const workbook = new ExcelJs.Workbook()
    const sheet = workbook.addWorksheet('抽籤結果') // 工作表頁籤
    // const sheet2 = workbook.addWorksheet('抽籤結果2')
     // 添加工作簿屬性

    sheet.addTable(obj)
    // 凍結窗格
    sheet.views = [
        {showGridLines: false},
	    {state: 'frozen', xSplit: 1, ySplit: 1}
    ]
    // 表格裡面的資料都填寫完成之後，訂出下載的callback function
		// 異步的等待他處理完之後，創建url與連結，觸發下載
	
		// const link = document.createElement("a");
        const content =  await workbook.xlsx.writeBuffer();
	    const blobData = new Blob([content], {
	    //   type: "application/vnd.ms-excel;charset=utf-8;"
         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	    });
        saveAs(blobData, '抽籤結果.xlsx');
	    // link.download = '測試的試算表.xlsx';
	    // link.href = URL.createObjectURL(blobData);
	    // link.click();
    
}