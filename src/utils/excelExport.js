import ExcelJs from 'exceljs'
import {saveAs} from 'file-saver'
export async function excelExport (obj){
    console.log('test',obj)
    const workbook = new ExcelJs.Workbook()
    const sheet = workbook.addWorksheet('抽籤結果') // 工作表頁籤
    const sheet2 = workbook.addWorksheet('抽籤結果2')
     // 添加工作簿屬性

    sheet.addTable(obj)
    // 凍結窗格
    sheet.views = [
	    {state: 'frozen', xSplit: 1, ySplit: 2},
    ]

    // 設置標籤顏色›    
    sheet.properties.tabColor = {
        argb:'FF3D7878', // 設置標籤顏色
        defaultColWidth:150,

    }
    // 針對所有表格設置一樣的寬度
    sheet.properties.defaultColWidth = 130

    // ? 個別設置寬度
    sheet.getColumn(1).width = 10
    sheet.getColumn(2).eachCell((cell, rowNumber) => {
        if (rowNumber === 2) {
            // ? 第一格的樣式
            cell.font = {
                name: '微軟正黑體',
                size: 24,
                bold: true,
                color: { argb: 'FFFF0000' }  
            }
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFF00' }  
            }
            cell.alignment = {
                vertical: 'middle',     // 垂直置中
                horizontal: 'center'    // 水平置中
            }
        } else {
            // ? 其他格子的樣式
            cell.font = {
                name: '微軟正黑體',
                size: 24,
                bold: true,
                color: { argb: 'FF3D7878' }  // 藍色 (ARGB 格式)
            }
            cell.alignment = {
                vertical: 'bottom',     // 垂直置中
                horizontal: 'right'    // 水平置中
            }
        }
    })


    // 橫向的
    // sheet.getRow(2).eachCell((cell,rowNumber)=>{
    //     cell.fill = {
    //         type: 'pattern',
    //         pattern: 'solid',
    //         fgColor: { argb: 'FFFFFF00' }  // 黃色背景
    //     }
    // })


    sheet.getColumn(2).width = 30

    sheet.getColumn(3).width = 40

    sheet.mergeCells('A1:C1')



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