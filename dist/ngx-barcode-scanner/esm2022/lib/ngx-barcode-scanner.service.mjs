import { Injectable } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { from, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class NgxBarcodeScannerService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJhcmNvZGUtc2Nhbm5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWJhcmNvZGUtc2Nhbm5lci9zcmMvbGliL25neC1iYXJjb2RlLXNjYW5uZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sTUFBc0QsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RixPQUFPLEVBQUUsSUFBSSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFLakQsTUFBTSxPQUFPLHdCQUF3QjtJQUc1QixhQUFhO1FBQ2xCLE9BQU87WUFDTCxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLFlBQVk7YUFDbkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2FBQ2xCO1lBQ0QsTUFBTSxFQUFFLElBQUk7WUFDWixZQUFZLEVBQUUsQ0FBQztZQUNmLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsVUFBZ0MsRUFBRSx3QkFBZ0M7UUFDNUUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRSxPQUFPLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxHQUFHLHdCQUF3QixDQUFDO0lBQzdELENBQUM7SUFFRCxLQUFLLENBQUMsTUFBNEIsRUFBRSx3QkFBZ0M7UUFDbEUsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssV0FBVyxFQUFFO1lBQzFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztTQUN6QztRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxV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RUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hHLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDckc7WUFFRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7Z0JBQy9DLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3pHO1NBQ0Y7SUFDSCxDQUFDOytHQTVGVSx3QkFBd0I7bUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzs0RkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFF1YWdnYSwgeyBRdWFnZ2FKU0NvbmZpZ09iamVjdCwgUXVhZ2dhSlNSZXN1bHRPYmplY3QgfSBmcm9tICdAZXJpY2JsYWRlL3F1YWdnYTInO1xuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTmd4QmFyY29kZVNjYW5uZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzY2FuUmVzdWx0PzogU3ViamVjdDxzdHJpbmc+O1xuXG4gIHB1YmxpYyBkZWZhdWx0Q29uZmlnKCk6IFF1YWdnYUpTQ29uZmlnT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5wdXRTdHJlYW06IHtcbiAgICAgICAgbmFtZTogJ0xpdmUnLFxuICAgICAgICB0eXBlOiAnTGl2ZVN0cmVhbScsXG4gICAgICB9LFxuICAgICAgbG9jYXRvcjoge1xuICAgICAgICBwYXRjaFNpemU6ICdtZWRpdW0nLFxuICAgICAgICBoYWxmU2FtcGxlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBsb2NhdGU6IHRydWUsXG4gICAgICBudW1PZldvcmtlcnM6IDgsXG4gICAgICBmcmVxdWVuY3k6IDEwLFxuICAgIH07XG4gIH1cblxuICBpc1NjYW5NYXRjaChzY2FuUmVzdWx0OiBRdWFnZ2FKU1Jlc3VsdE9iamVjdCwgZXJyb3JUaHJlc2hvbGRQZXJjZW50YWdlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBhdmdFcnJvcnMgPSB0aGlzLm1lYW5CeShzY2FuUmVzdWx0LmNvZGVSZXN1bHQuZGVjb2RlZENvZGVzLCAnZXJyb3InKTtcbiAgICByZXR1cm4gISFhdmdFcnJvcnMgJiYgYXZnRXJyb3JzIDwgZXJyb3JUaHJlc2hvbGRQZXJjZW50YWdlO1xuICB9XG5cbiAgc3RhcnQoY29uZmlnOiBRdWFnZ2FKU0NvbmZpZ09iamVjdCwgZXJyb3JUaHJlc2hvbGRQZXJjZW50YWdlOiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zY2FuUmVzdWx0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5zY2FuUmVzdWx0ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIH1cbiAgICBRdWFnZ2Eub25Qcm9jZXNzZWQoKHNjYW5SZXN1bHQ6IFF1YWdnYUpTUmVzdWx0T2JqZWN0KSA9PiB7XG4gICAgICB0aGlzLm9uUHJvY2Vzc2VkKHNjYW5SZXN1bHQpO1xuICAgIH0pO1xuICAgIFF1YWdnYS5vbkRldGVjdGVkKChyZXN1bHQ6IFF1YWdnYUpTUmVzdWx0T2JqZWN0KSA9PiB7XG4gICAgICBjb25zdCBiYXJjb2RlID0gcmVzdWx0LmNvZGVSZXN1bHQuY29kZTtcbiAgICAgIGlmICh0aGlzLmlzU2Nhbk1hdGNoKHJlc3VsdCwgZXJyb3JUaHJlc2hvbGRQZXJjZW50YWdlKSkge1xuICAgICAgICB0aGlzLnNjYW5SZXN1bHQ/Lm5leHQoYmFyY29kZSArICcnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFF1YWdnYS5pbml0KGNvbmZpZywgYXN5bmMgKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5zY2FuUmVzdWx0Py5lcnJvcihlcnJvcik7XG4gICAgICAgIGF3YWl0IHRoaXMuc3RvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUXVhZ2dhLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5zY2FuUmVzdWx0O1xuICB9XG5cbiAgc3RvcCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2NhblJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuc2NhblJlc3VsdD8udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuc2NhblJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGZyb20oUXVhZ2dhLnN0b3AoKSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICBwcml2YXRlIG1lYW5CeShhcnI6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWFycikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGFyci5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gKHByb3BlcnR5IGluIGl0ZW0gPyBhY2MgKyBpdGVtW3Byb3BlcnR5XSA6IGFjYyksIDApIC8gYXJyLmxlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgb25Qcm9jZXNzZWQocmVzdWx0OiBRdWFnZ2FKU1Jlc3VsdE9iamVjdCkge1xuICAgIGNvbnN0IGRyYXdpbmdDdHggPSBRdWFnZ2EuY2FudmFzLmN0eC5vdmVybGF5O1xuICAgIGNvbnN0IGRyYXdpbmdDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gUXVhZ2dhLmNhbnZhcy5kb20ub3ZlcmxheTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQuYm94ZXMpIHtcbiAgICAgICAgY29uc3QgY2FudmFzV2lkdGg6IHN0cmluZyA9IGRyYXdpbmdDYW52YXMuZ2V0QXR0cmlidXRlKCd3aWR0aCcpID8/ICcwJztcbiAgICAgICAgY29uc3QgY2FudmFzSGVpZ2h0OiBzdHJpbmcgPSBkcmF3aW5nQ2FudmFzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykgPz8gJzAnO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KGNhbnZhc1dpZHRoLCAxMCk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlSW50KGNhbnZhc0hlaWdodCwgMTApO1xuICAgICAgICBkcmF3aW5nQ3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVzdWx0LmJveGVzXG4gICAgICAgICAgLmZpbHRlcigoYm94KSA9PiBib3ggIT09IHJlc3VsdC5ib3gpXG4gICAgICAgICAgLmZvckVhY2goKGJveCkgPT4ge1xuICAgICAgICAgICAgUXVhZ2dhLkltYWdlRGVidWcuZHJhd1BhdGgoYm94LCB7IHg6IDAsIHk6IDEgfSwgZHJhd2luZ0N0eCwgeyBjb2xvcjogJ2dyZWVuJywgbGluZVdpZHRoOiAyIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdWx0LmJveCkge1xuICAgICAgICBRdWFnZ2EuSW1hZ2VEZWJ1Zy5kcmF3UGF0aChyZXN1bHQuYm94LCB7IHg6IDAsIHk6IDEgfSwgZHJhd2luZ0N0eCwgeyBjb2xvcjogJyMwMEYnLCBsaW5lV2lkdGg6IDIgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQuY29kZVJlc3VsdCAmJiByZXN1bHQuY29kZVJlc3VsdC5jb2RlKSB7XG4gICAgICAgIFF1YWdnYS5JbWFnZURlYnVnLmRyYXdQYXRoKHJlc3VsdC5saW5lLCB7IHg6ICd4JywgeTogJ3knIH0sIGRyYXdpbmdDdHgsIHsgY29sb3I6ICdyZWQnLCBsaW5lV2lkdGg6IDMgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=