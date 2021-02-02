import { Directive, ElementRef, OnDestroy, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import Grid, { GridOptions, Item } from 'muuri';

@Directive({
    selector: '[muuriGrid]'
})
export class MuuriGridDirective implements OnInit, OnDestroy, OnChanges {
    @Input() config: GridOptions;
    @Output() gridCreated: EventEmitter<Grid> = new EventEmitter();
    gridObject?: Grid;

    constructor(private elRef: ElementRef) {}

    ngOnInit(): void {
        this.init(this.elRef);
    }

    /**
     * Rebuild the grid when the Muuri config changes.
     * @param changes Changes object.
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (this.gridObject) {
            this.destroyLayout();
            this.init(this.elRef);
        }
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
    addItem(item: ElementRef): Item[] {
        return this.gridObject.add(item.nativeElement);
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

    /**
     * Remove an item from the grid.
     */
    removeItem(item: ElementRef): void {
        const gridItem = this.gridObject.getItem(item.nativeElement);
        if(gridItem === null 
        || item === null
        || item === undefined
        || gridItem === undefined) {
          //Double remotion might be happening, silence it
        } else {
          this.gridObject.remove([gridItem], {
              removeElements: true,
              layout: true
          });
        }
    }
}
