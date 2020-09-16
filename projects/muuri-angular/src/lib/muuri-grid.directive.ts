import { Directive, ElementRef, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Grid, { GridOptions } from 'muuri';

@Directive({
    selector: '[muuriGrid]'
})
export class MuuriGridDirective implements OnInit, OnDestroy {
    @Input() config: GridOptions;
    @Output() gridCreated: EventEmitter<Grid> = new EventEmitter();
    gridObject?: Grid;

    constructor(private elRef: ElementRef) {}

    ngOnInit(): void {
        this.init(this.elRef);
    }

    /**
     * Initialize the grid.
     */
    init(grid: ElementRef): void {
        this.gridObject = new Grid(grid.nativeElement, this.config);
        this.gridCreated.emit(this.gridObject);
    }

    /**
     * Add a new item to the grid.
     */
    addItem(item: ElementRef): void {
        this.gridObject.add(item.nativeElement);
    }

    destroyLayout(): void {
        this.gridObject.destroy();
        this.gridObject = null;
    }

    refresh(): void {
        this.gridObject.refreshItems();
    }

    ngOnDestroy(): void {
        this.destroyLayout();
    }
}
