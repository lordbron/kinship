.PHONY: client-install client

client-install:
	brew install android-platform-tools
	adb devices
	cd apps/main-xr && npm install

client:
	adb reverse tcp:5173 tcp:5173
	cd apps/main-xr && npm run dev
