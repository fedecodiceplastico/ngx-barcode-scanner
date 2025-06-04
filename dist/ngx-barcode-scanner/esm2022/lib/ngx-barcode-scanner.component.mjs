import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utils } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-barcode-scanner.service";
export class NgxBarcodeScannerComponent {
    constructor(service) {
        this.service = service;
        this.codes = [
            'code_128',
            'ean',
            'ean_8',
            'code_39',
            'code_39_vin',
            'codabar',
            'upc',
            'upc_e',
            'i2of5',
            '2of5',
            'code_93',
        ];
        this.valueChange = new EventEmitter();
        this.exception = new EventEmitter();
    }
    setConfig() {
        if (!this.config) {
            this.config = {
                ...this.service.defaultConfig(),
                decoder: {
                    readers: this.readers(),
                },
            };
        }
        if (!this.config.inputStream) {
            this.config.inputStream = {};
        }
        Utils.setOrDefault(this.config.inputStream, 'name', 'Live');
        Utils.setOrDefault(this.config.inputStream, 'type', 'LiveStream');
        if (!this.config.locator) {
            this.config.locator = {};
        }
        Utils.setOrDefault(this.config.locator, 'patchSize', 'medium');
        Utils.setOrDefault(this.config.locator, 'halfSample', false);
        Utils.setOrDefault(this.config, 'locate', true);
        Utils.setOrDefault(this.config, 'numOfWorkers', 8);
        Utils.setOrDefault(this.config, 'frequency', 10);
        if (!this.config.decoder) {
            this.config.decoder = {};
        }
        Utils.setOrDefault(this.config.decoder, 'readers', this.readers());
    }
    ngOnInit() {
        this.setConfig();
        const threshold = isNaN(this.errorThreshold) ? 0.1 : this.errorThreshold;
        const scanningService = this.service.start(this.config, threshold);
        scanningService.subscribe((value) => {
            this.valueChange.emit(value);
        }, (error) => {
            this.exception.emit(error);
        });
    }
    ngOnDestroy() {
        this.service.stop();
    }
    readers() {
        const types = typeof this.codes === 'string' ? [this.codes] : this.codes;
        return types.map((it) => `${it}_reader`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerComponent, deps: [{ token: i1.NgxBarcodeScannerService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NgxBarcodeScannerComponent, selector: "ngx-barcode-scanner", inputs: { codes: "codes", config: "config", errorThreshold: "errorThreshold", value: "value" }, outputs: { valueChange: "valueChange", exception: "exception" }, ngImport: i0, template: "<div id=\"interactive\" class=\"viewport\"></div>\n", styles: ["::ng-deep #interactive.viewport{position:relative;width:100%;height:auto;overflow:hidden;text-align:center}::ng-deep #interactive.viewport>canvas,::ng-deep #interactive.viewport>video{max-width:100%;width:100%}::ng-deep canvas.drawing,::ng-deep canvas.drawingBuffer{position:absolute;left:0;top:0}::ng-deep video{width:100%;object-fit:cover}:host{position:static;width:100%}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-barcode-scanner', template: "<div id=\"interactive\" class=\"viewport\"></div>\n", styles: ["::ng-deep #interactive.viewport{position:relative;width:100%;height:auto;overflow:hidden;text-align:center}::ng-deep #interactive.viewport>canvas,::ng-deep #interactive.viewport>video{max-width:100%;width:100%}::ng-deep canvas.drawing,::ng-deep canvas.drawingBuffer{position:absolute;left:0;top:0}::ng-deep video{width:100%;object-fit:cover}:host{position:static;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgxBarcodeScannerService }]; }, propDecorators: { codes: [{
                type: Input
            }], config: [{
                type: Input
            }], errorThreshold: [{
                type: Input
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], exception: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9uZ3gtYmFyY29kZS1zY2FubmVyL3NyYy9saWIvbmd4LWJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9uZ3gtYmFyY29kZS1zY2FubmVyL3NyYy9saWIvbmd4LWJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7QUFPaEMsTUFBTSxPQUFPLDBCQUEwQjtJQW9CckMsWUFBb0IsT0FBaUM7UUFBakMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFuQjVDLFVBQUssR0FBc0I7WUFDbEMsVUFBVTtZQUNWLEtBQUs7WUFDTCxPQUFPO1lBQ1AsU0FBUztZQUNULGFBQWE7WUFDYixTQUFTO1lBQ1QsS0FBSztZQUNMLE9BQU87WUFDUCxPQUFPO1lBQ1AsTUFBTTtZQUNOLFNBQVM7U0FDVixDQUFDO1FBSVEsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWUsQ0FBQztJQUVqRCxTQUFTO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRztnQkFDWixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO2dCQUMvQixPQUFPLEVBQUU7b0JBQ1AsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7aUJBQ3hCO2FBQ0YsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQzVC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c0JBQXBCLE1BQU07Z0JBQ0csU0FBUztzQkFBbEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4QmFyY29kZVNjYW5uZXJTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtYmFyY29kZS1zY2FubmVyLnNlcnZpY2UnO1xuaW1wb3J0IHtRdWFnZ2FKU0NvZGVSZWFkZXIsIFF1YWdnYUpTQ29uZmlnT2JqZWN0fSBmcm9tICdAZXJpY2JsYWRlL3F1YWdnYTInO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWJhcmNvZGUtc2Nhbm5lcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtYmFyY29kZS1zY2FubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5neEJhcmNvZGVTY2FubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjb2Rlczogc3RyaW5nIHwgc3RyaW5nW10gPSBbXG4gICAgJ2NvZGVfMTI4JyxcbiAgICAnZWFuJyxcbiAgICAnZWFuXzgnLFxuICAgICdjb2RlXzM5JyxcbiAgICAnY29kZV8zOV92aW4nLFxuICAgICdjb2RhYmFyJyxcbiAgICAndXBjJyxcbiAgICAndXBjX2UnLFxuICAgICdpMm9mNScsXG4gICAgJzJvZjUnLFxuICAgICdjb2RlXzkzJyxcbiAgXTtcbiAgQElucHV0KCkgY29uZmlnOiBRdWFnZ2FKU0NvbmZpZ09iamVjdDtcbiAgQElucHV0KCkgZXJyb3JUaHJlc2hvbGQ6IG51bWJlcjtcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZXhjZXB0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogTmd4QmFyY29kZVNjYW5uZXJTZXJ2aWNlKSB7fVxuXG4gIHByaXZhdGUgc2V0Q29uZmlnKCkge1xuICAgIGlmICghdGhpcy5jb25maWcpIHtcbiAgICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAuLi50aGlzLnNlcnZpY2UuZGVmYXVsdENvbmZpZygpLFxuICAgICAgICBkZWNvZGVyOiB7XG4gICAgICAgICAgcmVhZGVyczogdGhpcy5yZWFkZXJzKCksXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29uZmlnLmlucHV0U3RyZWFtKSB7XG4gICAgICB0aGlzLmNvbmZpZy5pbnB1dFN0cmVhbSA9IHt9O1xuICAgIH1cbiAgICBVdGlscy5zZXRPckRlZmF1bHQodGhpcy5jb25maWcuaW5wdXRTdHJlYW0sICduYW1lJywgJ0xpdmUnKTtcbiAgICBVdGlscy5zZXRPckRlZmF1bHQodGhpcy5jb25maWcuaW5wdXRTdHJlYW0sICd0eXBlJywgJ0xpdmVTdHJlYW0nKTtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmxvY2F0b3IpIHtcbiAgICAgIHRoaXMuY29uZmlnLmxvY2F0b3IgPSB7fTtcbiAgICB9XG4gICAgVXRpbHMuc2V0T3JEZWZhdWx0KHRoaXMuY29uZmlnLmxvY2F0b3IsICdwYXRjaFNpemUnLCAnbWVkaXVtJyk7XG4gICAgVXRpbHMuc2V0T3JEZWZhdWx0KHRoaXMuY29uZmlnLmxvY2F0b3IsICdoYWxmU2FtcGxlJywgZmFsc2UpO1xuICAgIFV0aWxzLnNldE9yRGVmYXVsdCh0aGlzLmNvbmZpZywgJ2xvY2F0ZScsIHRydWUpO1xuICAgIFV0aWxzLnNldE9yRGVmYXVsdCh0aGlzLmNvbmZpZywgJ251bU9mV29ya2VycycsIDgpO1xuICAgIFV0aWxzLnNldE9yRGVmYXVsdCh0aGlzLmNvbmZpZywgJ2ZyZXF1ZW5jeScsIDEwKTtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmRlY29kZXIpIHtcbiAgICAgIHRoaXMuY29uZmlnLmRlY29kZXIgPSB7fTtcbiAgICB9XG4gICAgVXRpbHMuc2V0T3JEZWZhdWx0KHRoaXMuY29uZmlnLmRlY29kZXIsICdyZWFkZXJzJywgdGhpcy5yZWFkZXJzKCkpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgICBjb25zdCB0aHJlc2hvbGQgPSBpc05hTih0aGlzLmVycm9yVGhyZXNob2xkKSA/IDAuMSA6IHRoaXMuZXJyb3JUaHJlc2hvbGQ7XG4gICAgY29uc3Qgc2Nhbm5pbmdTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlLnN0YXJ0KHRoaXMuY29uZmlnLCB0aHJlc2hvbGQpO1xuICAgIHNjYW5uaW5nU2VydmljZS5zdWJzY3JpYmUoXG4gICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5leGNlcHRpb24uZW1pdChlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc2VydmljZS5zdG9wKCk7XG4gIH1cblxuICByZWFkZXJzKCk6IFF1YWdnYUpTQ29kZVJlYWRlcltdIHtcbiAgICBjb25zdCB0eXBlcyA9IHR5cGVvZiB0aGlzLmNvZGVzID09PSAnc3RyaW5nJyA/IFt0aGlzLmNvZGVzXSA6IHRoaXMuY29kZXM7XG4gICAgcmV0dXJuIHR5cGVzLm1hcCgoaXQpID0+IGAke2l0fV9yZWFkZXJgIGFzIFF1YWdnYUpTQ29kZVJlYWRlcik7XG4gIH1cbn1cbiIsIjxkaXYgaWQ9XCJpbnRlcmFjdGl2ZVwiIGNsYXNzPVwidmlld3BvcnRcIj48L2Rpdj5cbiJdfQ==