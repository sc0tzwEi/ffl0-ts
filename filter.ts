type Filter = {
    cells : number[],
    cols : number,
    rows : number,
    transfer_code : number,
}

function newFilter(cols : number, rows : number, transfer_code : number) : Filter  {
    let f : Filter = {
        cells : new Array(cols*rows).fill(0),
        cols : cols,
        rows : rows,
        transfer_code : transfer_code,
    }
    return f;
}

function seedFilter(filter : Filter) {
    for (let row = 0 ; row < filter.rows ; row++) {
        for (let col = 0 ; col < filter.cols ; col++) {
            filter.cells[col*filter.rows + row] = 1.0 - 2.0*Math.random();
        }
    }
}

function randomSeededFilter() {
    let rows = Math.floor(Math.random() * 11 + 2);
    let cols = Math.floor(Math.random() * 11 + 2);
    let transfer_code = Math.floor(Math.random() * 2);
    let filter = newFilter(cols,rows, transfer_code);
    seedFilter(filter);
    return filter;
}

function newRedFilter() {
    red_filter = randomSeededFilter();
}
function newGreenFilter() {
    green_filter = randomSeededFilter();
}
function newBlueFilter() {
    blue_filter = randomSeededFilter();
}

function applyFilterCell(filter :  Filter, layer : number[], col : number, row : number) {
    let sum = 0;
    let counter = 0;
    let this_row = 0;
    let this_col = 0;
    let target_index = 0;	
    for (let c = 0; c < filter.cols; c++) {
        for (let r = 0; r < filter.rows; r++) {
            this_row = r +row;
            if (this_row >= global_rows) this_row -= global_rows;
            this_col = c +col;
            if (this_col >= global_cols) this_col -= global_cols;
            
            target_index = this_col*global_rows + this_row;

            sum += layer[target_index]*filter.cells[c*filter.rows + r];
        }
    }
    // let sum = randomFloat();
    return Math.tanh(sum);

    // switch (filter.transfer_code) {
    //     case 0 : return Math.tanh(sum);
    //     case 1 : return  Math.sin(Math.PI * sum);

    // }
}

function applyFilter(filter : Filter, layer : number[]) : number[] {
    let workspace = new Array(global_rows*global_cols).fill(0);
    for (let c = 0; c < global_cols; c++) {
        for (let r = 0; r < global_rows; r++) {
            workspace[c*global_rows + r ] = applyFilterCell(filter, layer, c, r);
        }
    }
    return workspace;
}