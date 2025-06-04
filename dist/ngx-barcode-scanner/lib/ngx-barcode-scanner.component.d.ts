import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NgxBarcodeScannerService } from './ngx-barcode-scanner.service';
import { QuaggaJSCodeReader, QuaggaJSConfigObject } from '@ericblade/quagga2';
import * as i0 from "@angular/core";
export declare class NgxBarcodeScannerComponent implements OnInit, OnDestroy {
    private service;
    codes: string | string[];
    config: QuaggaJSConfigObject;
    errorThreshold: number;
    value: string;
    valueChange: EventEmitter<any>;
    exception: EventEmitter<any>;
    constructor(service: NgxBarcodeScannerService);
    private setConfig;
    ngOnInit(): void;
    ngOnDestroy(): void;
    readers(): QuaggaJSCodeReader[];
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxBarcodeScannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxBarcodeScannerComponent, "ngx-barcode-scanner", never, { "codes": { "alias": "codes"; "required": false; }; "config": { "alias": "config"; "required": false; }; "errorThreshold": { "alias": "errorThreshold"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; "exception": "exception"; }, never, never, false, never>;
}
