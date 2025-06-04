import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { Subject, from } from 'rxjs';

class NgxBarcodeScannerService {
    defaultConfig() {
        return {
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
            },
            locator: {
                patchSize: 'medium',
                halfSample: false,
            },
            locate: true,
            numOfWorkers: 8,
            frequency: 10,
        };
    }
    isScanMatch(scanResult, errorThresholdPercentage) {
        const avgErrors = this.meanBy(scanResult.codeResult.decodedCodes, 'error');
        return !!avgErrors && avgErrors < errorThresholdPercentage;
    }
    start(config, errorThresholdPercentage) {
        if (typeof this.scanResult === 'undefined') {
            this.scanResult = new Subject();
        }
        Quagga.onProcessed((scanResult) => {
            this.onProcessed(scanResult);
        });
        Quagga.onDetected((result) => {
            const barcode = result.codeResult.code;
            if (this.isScanMatch(result, errorThresholdPercentage)) {
                this.scanResult?.next(barcode + '');
            }
        });
        Quagga.init(config, async (error) => {
            if (error) {
                this.scanResult?.error(error);
                await this.stop();
            }
            else {
                Quagga.start();
            }
        });
        return this.scanResult;
    }
    stop() {
        if (typeof this.scanResult !== 'undefined') {
            this.scanResult?.unsubscribe();
            this.scanResult = undefined;
        }
        return from(Quagga.stop());
    }
    /* eslint-disable */
    meanBy(arr, property) {
        if (!arr) {
            return undefined;
        }
        return arr.reduce((acc, item) => (property in item ? acc + item[property] : acc), 0) / arr.length;
    }
    onProcessed(result) {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;
        if (result) {
            if (result.boxes) {
                const canvasWidth = drawingCanvas.getAttribute('width') ?? '0';
                const canvasHeight = drawingCanvas.getAttribute('height') ?? '0';
                const width = parseInt(canvasWidth, 10);
                const height = parseInt(canvasHeight, 10);
                drawingCtx.clearRect(0, 0, width, height);
                result.boxes
                    .filter((box) => box !== result.box)
                    .forEach((box) => {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
                });
            }
            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
            }
            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class Utils {
    /* eslint-disable */
    static setOrDefault(object, path, value) {
        if (typeof object[path] === 'undefined') {
            object[path] = value;
        }
    }
}

class NgxBarcodeScannerComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerComponent, deps: [{ token: NgxBarcodeScannerService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NgxBarcodeScannerComponent, selector: "ngx-barcode-scanner", inputs: { codes: "codes", config: "config", errorThreshold: "errorThreshold", value: "value" }, outputs: { valueChange: "valueChange", exception: "exception" }, ngImport: i0, template: "<div id=\"interactive\" class=\"viewport\"></div>\n", styles: ["::ng-deep #interactive.viewport{position:relative;width:100%;height:auto;overflow:hidden;text-align:center}::ng-deep #interactive.viewport>canvas,::ng-deep #interactive.viewport>video{max-width:100%;width:100%}::ng-deep canvas.drawing,::ng-deep canvas.drawingBuffer{position:absolute;left:0;top:0}::ng-deep video{width:100%;object-fit:cover}:host{position:static;width:100%}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-barcode-scanner', template: "<div id=\"interactive\" class=\"viewport\"></div>\n", styles: ["::ng-deep #interactive.viewport{position:relative;width:100%;height:auto;overflow:hidden;text-align:center}::ng-deep #interactive.viewport>canvas,::ng-deep #interactive.viewport>video{max-width:100%;width:100%}::ng-deep canvas.drawing,::ng-deep canvas.drawingBuffer{position:absolute;left:0;top:0}::ng-deep video{width:100%;object-fit:cover}:host{position:static;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: NgxBarcodeScannerService }]; }, propDecorators: { codes: [{
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

class NgxBarcodeScannerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerModule, declarations: [NgxBarcodeScannerComponent], exports: [NgxBarcodeScannerComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxBarcodeScannerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxBarcodeScannerComponent],
                    imports: [],
                    exports: [NgxBarcodeScannerComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgxBarcodeScannerComponent, NgxBarcodeScannerModule, NgxBarcodeScannerService };
//# sourceMappingURL=eisberg-labs-ngx-barcode-scanner.mjs.map
