import { QuaggaJSConfigObject, QuaggaJSResultObject } from '@ericblade/quagga2';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NgxBarcodeScannerService {
    private scanResult?;
    defaultConfig(): QuaggaJSConfigObject;
    isScanMatch(scanResult: QuaggaJSResultObject, errorThresholdPercentage: number): boolean;
    start(config: QuaggaJSConfigObject, errorThresholdPercentage: number): Observable<string>;
    stop(): Observable<void>;
    private meanBy;
    private onProcessed;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxBarcodeScannerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxBarcodeScannerService>;
}
